const User = require('../models/User');

class UserController {
  // [GET] /
  async profile(req, res) {
    const _username = req.query.q;

    const user = await User.findOne({
      username: _username,
    })
      .lean()
      .exec();

    res.locals = { ...res.locals, title: 'Hồ sơ', user: user };

    if (user === null) {
      res.render('error');
      return;
    }

    res.render('profile');

    // res.locals = { ...res.locals, title: 'Home' };
    // res.render('profile');
  }

  // [GET] /test
  index(req, res) {
    res.locals = { ...res.locals, title: 'Hồ sơ' };
    res.render('profile');
  }

  // [POST] /update
  update(req, res, next) {
    if (!req.session.User) {
      res.redirect('/');
    }

    let date = req.body.dob.split('-');
    if (date[2].length == 2) {
      if (date[2][0] == '0') {
        date[2] = date[2][1];
      }
    }
    if (date[1].length == 2) {
      if (date[1][0] == '0') {
        date[1] = date[1][1];
      }
    }
    req.body.dob = date[2] + ' Tháng ' + date[1] + ' Năm ' + date[0];

    const _username = res.locals.session.User.username;

    User.updateOne({ username: _username }, req.body)
      .then(() => res.redirect('/'))
      .catch(next);
  }
}

module.exports = new UserController();
