const User = require('../models/User');

class SiteController {
  // [GET] /
  index(req, res) {
    console.log(res.locals.session);
    console.log(res.locals.session.User);
    res.locals = { ...res.locals, title: 'Home' };
    res.render('home');
  }
}

module.exports = new SiteController();
