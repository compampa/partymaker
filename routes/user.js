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
  const response = await Users.findAll({ raw: true });
<<<<<<< HEAD
  console.log(response);
=======
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
  }
>>>>>>> 498458eaf21a2b7466d608751fdec9086c9cc0fd
  res.render('main', { response });
});

// карточка рандомного юзера
// Добавить информацию из других таблиц о юзере
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
