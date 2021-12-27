const User = require('../models/User');

class UserController {
  // [GET] /
  index(req, res) {
    res.locals = { ...res.locals, title: 'Home' };
    res.render('profile');
  }
}

module.exports = new UserController();
