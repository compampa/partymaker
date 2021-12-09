const express = require('express');
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

// карточка рандомного юзера
// Добавить информацию из других таблиц о юзере

module.exports = router;
