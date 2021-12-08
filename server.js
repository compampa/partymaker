const express = require('express');
const process = require('process');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const userRouter = require('./routes/user');

const app = express();
const PORT = 3000;

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

app.use('/', userRouter);

app.listen(PORT);
