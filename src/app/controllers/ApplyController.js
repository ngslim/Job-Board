const Job = require('../models/Job');
const Apply = require('../models/Apply');

class ApplyController {
  // [GET] /apply/my-applies
  async my_applies(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    const _username = req.session.User.username;

    const applies = await Apply.find({ username: _username }).lean().exec();

    if (applies.length == 0) {
      res.redirect('/no-apply');
      return;
    }

    var applyInfos = [];

    for (let i = 0; i < applies.length; i++) {
      const applyInfo = await Job.findOne({ _id: applies[i].job_id })
        .lean()
        .exec();

      if (applyInfo) {
        applyInfo.created = applies[i].created;
        applyInfo.apply_id = applies[i]._id;
        applyInfos.push(applyInfo);
      }
    }

    res.locals = {
      ...res.locals,
      title: 'Danh sách đã ứng tuyển',
      applyInfos: applyInfos,
    };
    res.render('my-applies');

    // res.locals = { ...res.locals, title: 'Ứng tuyển đã gửi' };
    // res.render('explore');
  }

  // [POST] /apply/apply-job?_id=_id
  async apply_job(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    const __id = req.query._id;
    const _username = req.session.User.username;

    if (_username == req.body.job_owner) {
      res.redirect('/apply/my-applies');
    }

    const apply = await Apply.findOne({ job_id: __id, username: _username })
      .lean()
      .exec();

    if (apply == null) {
      const newApply = new Apply(req.body);
      newApply.job_id = __id;
      newApply.username = _username;
      newApply.save();
    }

    res.redirect('/apply/my-applies');
  }

  // [POST] /apply/delete-apply?_id=_id
  async delete_apply(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    const __id = req.query._id;
    const _username = req.session.User.username;

    const apply = await Apply.findOne({ _id: __id, username: _username })
      .lean()
      .exec();

    console.log(apply);

    if (apply == null) {
      res.redirect('/apply/my-applies');
      return;
    }

    Apply.deleteOne({ _id: __id }).then(() => {
      res.redirect('/apply/my-applies');
    });
  }
}

module.exports = new ApplyController();
