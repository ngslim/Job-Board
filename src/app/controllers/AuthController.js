const User = require('../models/User');

class AuthController {
  // [GET] /login
  login(req, res) {
    if (req.session.User) {
      res.redirect('/');
      return;
    }
    res.locals = { title: 'Đăng nhập', layout: 'null' };
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
        title: 'Đăng nhập',
        layout: 'null',
        message: 'Tài khoản không tồn tại',
      };
      res.render('login');
    } else if (user.password !== _password) {
      res.locals = {
        title: 'Đăng nhập',
        layout: 'null',
        message: 'Sai mật khẩu',
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
      return;
    }
    res.locals = { title: 'Đăng ký', layout: 'null' };
    res.render('register');
  }

  // [POST] /create-user
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
      res.redirect('/post-register');
    } else {
      res.locals = {
        title: 'Đăng ký',
        layout: 'null',
        message: 'Username đã được sử dụng',
      };
      res.render('register');
    }
  }

  post_register(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }
    res.locals = { ...res.locals, title: 'Đăng ký' };
    res.render('post-register', { layout: 'null' });
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }
}

module.exports = new AuthController();
