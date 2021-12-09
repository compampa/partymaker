
const express = require('express');
const { getNameAndId } = require('../middleware/allMiddlewares');
const {
  Users, Tables, Interests, Themes,
} = require('../db/models');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  if (req.session.userid !== undefined) {
    res.render('login', { message: 'Вы уже зарегистрированы, попробуйте залогиниться!' });
  } else res.render('login');
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const currentUser = await Users.findOne({
    raw: true, where: { id: req.session.userid },
  });
  if (currentUser.login === login) {
    // eslint-disable-next-line no-cond-assign
    if (currentUser.password === password) {
      res.redirect('/main');
    } else {
      res.render('login', { wrongPassword: 'Неправильный пароль' });
    }
  } else {
    res.render('login', { opa: 'Неправильный логин' });
  }
});

router.get('/registration', (req, res) => {
  res.render('registration');
});
router.post('/registration', async (req, res) => {
  try {

    console.log('должна отработать раз', req.body, res.locals);

    const currentUser = await Users.findOne({ raw: true, where: { email: req.body.email } });
    console.log(currentUser);
    if (!currentUser) {
      const newUser = await Users.create(req.body);
      req.session.name = newUser.dataValues.login;

      req.session.userid = newUser.dataValues.id;

      console.log(newUser.dataValues.id);
      console.log('присовоил нейм сессии ->>>>', req.session.name);
      req.session.userid = newUser.dataValues.id;
      console.log('айди нейм сессии ->>>>', req.session.userid);

      res.sendStatus(222);
    } else {
      req.session.name = currentUser.login;
      req.session.userid = currentUser.id;
      res.sendStatus(333);
    }
  } catch (err) {
    console.log(err);
  }
});
router.get('/registration/about', async (req, res) => {
  const interests = await Interests.findAll({ raw: true });
  const themes = await Themes.findAll({ raw: true });
  res.render('about', { titleInterests: interests, titleThemes: themes });
});


router.put('/registration/about', async (req, res) => {
  const {
    name, age, interestTitle, themeTitle, smoke, drink,
  } = req.body;
  const bol = Boolean(smoke);
  const bol2 = Boolean(drink);
  await Users.update({
    name, age, smoke: bol, drink: bol2,
  }, { where: { id: req.session.userid } });
  const interest = await Interests.findOne({ where: { title: interestTitle } });
  const theme = await Themes.findOne({ where: { title: themeTitle } });
  await Tables.create({
    user_id: req.session.userid,
    interest_id: interest.dataValues.id,
    theme_id: theme.dataValues.id,
  });
  res.sendStatus(222);
});


router.post('/registration/about', (req, res) => {
});


router.get('/profile', async (req, res) => {
  const { name, userid } = req.session;
  const user = await Users.findOne({ where: { id: userid } });
  const category = await Interests.findAll();
  const theme = await Themes.findAll();
  const { login, email, age } = user;
  res.render('profile', {
    name, userid, login, email, age, category, theme,
  });
});

router.post('/profile/:id', async (req, res) => {
  const {
    name, login, email, age, social,
  } = req.body;
  console.log('req.queryreq.queryreq.queryreq.queryreq.queryreq.query', req.query);
  const { id } = req.params;
  console.log('id=>>>>>>>>>>>>>>>>>>>>>>', id);
  console.log('req.session.id!----------->', req.session.userid);
  if (id === req.session.userid) {
    const tempBack = await Users.update({
      name, login: +login, email, age, social,
    }, { where: { id } });
    console.log('tempBack=====================>', tempBack);
    res.json({ respond: 'DONE' });
  }
  res.json({ respond: 'False' });
});



router.get('/main', async (req, res) => {

  const maxcount = 20;
  const random = Math.floor(Math.random(0, maxcount - 15));
  const arr = '123456789012345'.split('').map((el, i) => random + i);
  // const response = await Users.findAll({ where: { id: arr } });
  // function getRandomInt(max) {
  // 	return Math.floor(Math.random() * max);
  // }
  // console.log(response);
  const response = [
  	{ email: 'yra1' },
  	{ email: 'kirill2',age: 12  },
		{ age: 12 },
  	{ email: 'yra3' },
  	{ email: 'kirill4' },
		{ age: 22 },
  ];
  response.sort((a, b) => Math.random() - 0.5);

  const response = await Users.findAll({ raw: true });

  console.log(response);
  res.render('main', { response });
});


router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ where: { id } });
    console.log(user);
    res.render('userPage', { user });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
