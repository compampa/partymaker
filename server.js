const express = require('express');
const process = require('process');
const path = require('path');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { getNameAndId } = require('./middleware/allMiddlewares');
const cors = require('cors');

const FileStore = require('session-file-store')(session);

const userRouter = require('./routes/user');

const app = express();
const PORT = 3001;

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(process.env.PWD, 'public')));
app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(session({
  store: new FileStore(),
  secret: 'qwerty',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  name: 'auth',
}));
app.use(fileUpload());
/*  */
// app.use(express.methodOverride());
// app.use(express.bodyParser({ keepExtensions: true, uploadDir: path.join(__dirname, '/files') }));
/*  */

app.use(getNameAndId);

app.use('/', userRouter);

app.listen(PORT);
