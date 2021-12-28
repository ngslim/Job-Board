const User = require('../models/User');

class SiteController {
  // [GET] /
  index(req, res) {
    res.locals = { ...res.locals, title: 'Trang chủ' };
    res.render('home');
  }

  // [GET] /error
  error(req, res) {
    res.locals = { ...res.locals, title: 'Error' };
    res.render('error');
  }
}

module.exports = new SiteController();
