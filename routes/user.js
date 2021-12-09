const express = require('express');
const { Users, Tables } = require('../db/models');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});



router.get('/registration', (req, res) => {
  res.render('registration');
});

router.post('/registration', async (req, res) => {
  const { login, email, password } = req.body;
  try {
    await Users.create({ login, email, password });
    // await Tables.create({ user_id: user.id });
    console.log(login, email, password);
    res.render('preferences');
  } catch (err) { console.log(err); }
});

router.get('/preferences', (req, res) => {
  const {
    title, aim, smoking, drink, social,
  } = req.body;
  console.log(title, aim, smoking, drink, social);
  res.render('index');
});

module.exports = router;
