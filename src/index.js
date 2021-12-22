const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine('hbs', engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './resources/views'));

app.get('/', (req, res) => res.render('home'));
app.get('/login', (req, res) =>
  res.render('login', { title: 'Log In', layout: 'null' })
);
app.get('/register', (req, res) =>
  res.render('register', { title: 'Register', layout: 'null' })
);
app.get('/explore', (req, res) => res.render('explore'));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
