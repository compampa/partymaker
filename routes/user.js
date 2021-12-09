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

router.get('/profile', async (req, res) => {
  // id юзера через req.session
  res.render('profile');
});
module.exports = router;
