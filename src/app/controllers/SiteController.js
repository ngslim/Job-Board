const User = require('../models/User');

class SiteController {
  // [GET] /
  index(req, res) {
    res.locals = { ...res.locals, title: 'Home' };
    res.render('home');
  }
}

module.exports = new SiteController();
