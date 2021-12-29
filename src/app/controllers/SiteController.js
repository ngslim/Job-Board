const session = require('express-session');
const User = require('../models/User');

class SiteController {
  // [GET] /
  index(req, res) {
    res.locals = { ...res.locals, title: 'Trang chủ' };
    res.render('home');
  }

  // [GET] /404
  error_404(req, res) {
    res.locals = { ...res.locals, title: 'Lỗi' };
    res.render('404');
  }

  // [GET] /no-job
  error_no_job(req, res) {
    res.locals = { ...res.locals, title: 'Lỗi' };
    res.render('no-job');
  }

  // [GET] /no-apply
  error_no_apply(req, res) {
    res.locals = { ...res.locals, title: 'Lỗi' };
    res.render('no-apply');
  }

  // [GET] /error-apply
  error(req, res) {
    res.locals = { ...res.locals, title: 'Lỗi' };
    res.render('error');
  }

  // [GET] /test
  test(req, res) {
    res.locals = { ...res.locals, title: 'Test' };
    res.render('test');
  }
}

module.exports = new SiteController();
