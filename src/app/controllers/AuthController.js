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
  //[POST] /login
  async verify(req, res, next) {
    const _username = req.body.username;
    const _password = req.body.password;

    const user = await User.findOne({
      username: _username,
      password: _password,
    }).exec();

    if (user === null) {
      res.locals = {
        title: 'Login',
        layout: 'null',
        message: 'Wrong username or password',
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

  logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
}

module.exports = new AuthController();
