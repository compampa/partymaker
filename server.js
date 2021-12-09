const express = require('express');
const process = require('process');
const cookieParser = require('cookie-parser');
const session = require('express-session');

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

app.use((req, res, next) => {
  res.locals.user = req.session?.name;
  res.locals.userId = req.session?.userid;
  console.log('->>>>>>>>>>>>>>>>>', res.locals);
  next();
});

app.use('/', userRouter);

app.listen(PORT);
