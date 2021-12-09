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
    console.log(req.body);
    const currentUser = await Users.findOne({ raw: true, where: { email: req.body.email } });
    if (!currentUser) {
      const newUser = await Users.create(req.body);

      req.session.name = newUser.dataValues.login;

      req.sessison.userId = newUser.dataValues.id;
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
  console.log(interests, themes);
  res.render('about', { titleInterests: interests, titleThemes: themes });
});

router.post('/registration/about', (req, res) => {

});

module.exports = router;
