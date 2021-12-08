const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/registration', (req, res) => {
  res.render('registration');
});

router.post('/registration', (req, res) => {
  const { login, email, password } = req.body;
  console.log(login, email, password);
  res.render('preferences');
});

router.get('/preferences', (req, res) => {
  const {
    title, aim, smoking, drink, social,
  } = req.body;
  console.log(title, aim, smoking, drink, social);
  res.render('index');
});

module.exports = router;
