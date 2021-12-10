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
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const currentUser = await Users.findOne({
    raw: true, where: { login },
  });
  if (currentUser) {
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
  } else {
    res.render('login', { opa: 'Неправильный логин' });
  }
});

router.get('/registration', (req, res) => {
  res.render('registration');
});
router.post('/registration', async (req, res) => {
  try {
    const currentUser = await Users.findOne({ raw: true, where: { email: req.body.email } });
    if (!currentUser) {
      const newUser = await Users.create(req.body);
      console.log(newUser);
      req.session.name = newUser.dataValues.login;

      req.session.userid = newUser.dataValues.id;

      res.sendStatus(222);
    } else {
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
    name, age, interestTitle, themeTitle, smoke, drink, linkSocial,
  } = req.body;
  const bol = Boolean(smoke);
  const bol2 = Boolean(drink);
  await Users.update({
    name, age, smoke: bol, drink: bol2, social: linkSocial,
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
/* MAIN USR */
router.post('/profile/:id', async (req, res) => {
  const {
    name, login, email, age, social, password,
  } = req.body;
  const { id } = req.params;
  console.log(id);
  console.log(req.session.userid);
  try {
    if (+id === req.session.userid) {
      await Users.update({
        name, login, email, age: +age, social, password,
      }, { where: { id } });
      res.json({ respond: 'DONE' });
    }
    res.json({ respond: 'False' });
  } catch (err) {
    console.log(err);
  }
});

/*
  THEMES
  CATEGORIES
*/
router.post('/profile/add/:id', async (req, res) => {
  console.log('req.filesreq.filesreq.filesreq.filesreq.filesreq.files');
  const {
    smoke, drink, titleCat, titleTheme,
  } = req.body;
  const { id } = req.params;
  try {
    if (Number(id) === req.session.userid) {
      /* UPLOADING FILES */
      // console.log(req.files);
      // const sampleFile = req.files.file;
      // const fileName = sampleFile.name.split(' ').join('');
      // const fullname = `${new Date().getTime()}_${fileName}`;
      // const uploadPath = `${process.env.PWD}/public/uploads/`;

      // if (!req.files || Object.keys(req.files).length === 0) {
      // return res.status(400).send('No files were uploaded.');
      // }

      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      // const uploadPath1 = uploadPath + fullname; // add to db

      // Use the mv() method to place the file somewhere on your server
      // sampleFile.mv(uploadPath1, (err) => {
      // if (err) return res.status(500).send(err);
      // });
      /*  */
      // const interest = await Interests.findOne({ where: { title: titleCat } });
      // const theme = await Themes.findOne({ where: { title: titleTheme } });
      await Themes.update({
        title: titleTheme,
      }, { where: { id } });
      await Interests.update({
        title: titleCat,
      }, { where: { id } });
      await Users.update({
        drink, smoke,
      }, { where: { id } });
      return res.json({ respond: 'DONE' });
      /*  */
      // if (await Tables.findOne({ user_id: req.session.userid })) {
      //   await Tables.update(
      //     { interest_id: interest.dataValues.id, theme_id: theme.dataValues.id },
      //     { where: { user_id: req.session.userid } },
      //   );
      // } else {
      //   await Tables.create({
      //     user_id: req.session.userid,
      //     interest_id: interest.dataValues.id,
      //     theme_id: theme.dataValues.id,
      //   });
      // }
      /*  */
    }
    return res.json({ respond: 'False' });
  } catch (err) {
    console.log(err);
  }
});
/*
 */
router.get('/main', async (req, res) => {
  const maxcount = 20;
  const random = Math.floor(Math.random(0, maxcount - 15));
  const arr = '123456789012345'.split('').map((el, i) => random + i);
  // const response = await Users.findAll({ where: { id: arr } });
  // function getRandomInt(max) {
  // 	return Math.floor(Math.random() * max);
  // }
  // console.log(response);

  const response = await Users.findAll({ raw: true });
  response.sort((a, b) => Math.random() - 0.5);

  res.render('main', { response });
});

router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findOne({ where: { id } });
    res.render('userPage', { user });
  } catch (err) {
    console.log(err);
  }
});
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Interests.findOne({ where: { id } });
    const themes = await Themes.findOne({ where: { id } });
    const profile = await Users.findOne({ where: { id } });
    res.render('userPage', { profile, category, themes });
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('auth');
  res.redirect('/');
});

module.exports = router;
