const User = require('../models/User');

class AuthController {
  // [GET] /login
  login(req, res) {
    if (req.session.User) {
      res.redirect('/');
    }
    res.locals = { title: 'Login', layout: 'null' };
    res.render('login');
  }
  //[POST] /verify
  async verify(req, res, next) {
    const _username = req.body.username;
    const _password = req.body.password;

    const user = await User.findOne({
      username: _username,
    }).exec();

    if (user === null) {
      res.locals = {
        title: 'Login',
        layout: 'null',
        message: 'Account does not exist',
      };
      res.render('login');
    } else if (user.password !== _password) {
      res.locals = {
        title: 'Login',
        layout: 'null',
        message: 'Wrong password',
      };
      res.render('login');
    } else {
      req.session.User = {
        username: _username,
      };
      res.locals.session = req.session;
      res.redirect('/');
    }
  }

  // [GET] /register
  register(req, res) {
    if (req.session.User) {
      res.redirect('/');
    }
    res.locals = { title: 'Register', layout: 'null' };
    res.render('register');
  }

  // [POST] /create
  async create(req, res, next) {
    const _username = req.body.username;
    const _email = req.body.email;
    const _password = req.body.password;

    const user = await User.findOne({
      username: _username,
    }).exec();

    if (user === null) {
      User.create({
        username: _username,
        password: _password,
        email: _email,
      });
      req.session.User = {
        username: _username,
      };
      res.locals.session = req.session;
      res.redirect('/');
    } else {
      res.locals = {
        title: 'Register',
        layout: 'null',
        message: 'This username has been used',
      };
      res.render('register');
    }
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
}

module.exports = new AuthController();
