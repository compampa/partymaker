/* const express = require('express');
const {
  Users, Tables, Interests, Themes,
} = require('../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/registration', (req, res) => {
  res.render('registration');
});

router.post('/registration', async (req, res) => {
  try {
    console.log('должна отработать раз', req.body);
    const currentUser = await Users.findOne({ raw: true, where: { email: req.body.email } });
    if (!currentUser) {
      const newUser = await Users.create(req.body);
      req.session.name = newUser.dataValues.login;
      console.log(newUser.dataValues.id);
      console.log('присовоил нейм сессии ->>>>', req.session.name);
      req.session.userid = newUser.dataValues.id;
      console.log('айди нейм сессии ->>>>', req.session.userid);
      res.sendStatus(222);
    }
    if (currentUser) {
      res.json({ message: 'Вы уже зарегистрированы, попробуйте залогиниться!' });
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
router.post('/registration/about', (req, res) => {

});

router.get('/main', async (req, res) => {
  const response = await Users.findAll({ raw: true });
  console.log(response);
  res.render('main', { response });
});

// карточка рандомного юзера
// Добавить информацию из других таблиц о юзере

module.exports = router;
 */
const express = require('express');
const { getNameAndId } = require('../middleware/allMiddlewares');
const {
  Users, Tables, Interests, Themes,
} = require('../db/models');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('index');
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
      console.log(newUser.dataValues.id);
      console.log('присовоил нейм сессии ->>>>', req.session.name);
      req.session.userid = newUser.dataValues.id;
      console.log('айди нейм сессии ->>>>', req.session.userid);
      res.sendStatus(222);
    }
    if (currentUser) {
      res.json({ message: 'Вы уже зарегистрированы, попробуйте залогиниться!' });
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
module.exports = router;
