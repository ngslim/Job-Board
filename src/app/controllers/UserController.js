const User = require('../models/User');

class UserController {
  // [GET] /profile?q=username
  async profile(req, res) {
    const _username = req.query.q;

    const user = await User.findOne({
      username: _username,
    })
      .lean()
      .exec();

    if (user === null) {
      res.locals = { ...res.locals, title: 'Hồ sơ' };
      res.render('404');
      return;
    }

    res.locals = { ...res.locals, title: 'Hồ sơ', user: user };

    res.render('profile');
  }

  // [POST] /update-user
  update(req, res, next) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    if (req.body.dob !== '') {
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
    }

    const _username = res.locals.session.User.username;

    User.updateOne({ username: _username }, req.body)
      .then(() => res.redirect('/'))
      .catch(next);
  }
}

module.exports = new UserController();
