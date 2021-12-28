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

  // [GET] /test
  test(req, res) {
    res.locals = { ...res.locals, title: 'Test' };
    res.render('test');
  }
}

module.exports = new SiteController();
