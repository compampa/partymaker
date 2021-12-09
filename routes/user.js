const express = require('express');
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
    const currentUser = await Users.findOne({ raw: true, where: { email: req.body.email } });
    if (!currentUser) {
      const newUser = await Users.create(req.body);
      req.session.name = newUser.dataValues.login;
      req.session.userid = newUser.dataValues.id;
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

module.exports = router;
