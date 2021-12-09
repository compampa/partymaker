const express = require('express');
const process = require('process');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { getNameAndId } = require('./middleware/allMiddlewares');

const userRouter = require('./routes/user');

const app = express();
const PORT = 3001;

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'qwerty',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  name: 'auth',
}));

app.use(getNameAndId);

app.use('/', userRouter);

app.listen(PORT);
