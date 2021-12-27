const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
const flash = require('connect-flash');
const session = require('express-session');

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'job-board-session',
    cookie: { maxAge: 60000 },
  })
);

app.use(function (req, res, next) {
  res.locals.success_alert_message = req.flash('success_alert_message');
  res.locals.error_message = req.flash('error_message');
  res.locals.error = req.flash('error');
  next();
});

//HTTP logger
app.use(morgan('combined'));

//Connect database
const db = require('./config/db');
db.connect();

//Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Template engine
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './resources/views'));

app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

const pageRouter = require('./routers/route');
pageRouter(app);

app.get('/', function (req, res) {
  res.redirect('/');
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
