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
        applyInfo.status = applies[i].status;
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
    const __id = req.query._id;

    if (!req.session.User) {
      res.redirect('/login');
      return;
    }

    const _username = req.session.User.username;

    if (_username == req.body.job_owner) {
      res.locals = {
        ...res.locals,
        title: 'Lỗi',
        message: 'Bạn đang ứng tuyển công việc của mình :(',
      };
      res.render('error');
      return;
    }

    const apply = await Apply.findOne({ job_id: __id, username: _username })
      .lean()
      .exec();

    if (apply != null) {
      res.locals = {
        ...res.locals,
        title: 'Lỗi',
        message: 'Bạn đã ứng tuyển công việc này',
      };
      res.render('error');
      return;
    }

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

    if (apply == null) {
      res.redirect('/apply/my-applies');
      return;
    }

    Apply.deleteOne({ _id: __id }).then(() => {
      res.redirect('/apply/my-applies');
    });
  }

  // [GET] /apply/apply-list?_id=_id
  async apply_list(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    const __id = req.query._id;
    const _username = req.session.User.username;

    const job = await Job.findOne({ _id: __id, posted_by: _username })
      .lean()
      .exec();

    if (job == null) {
      res.redirect('/explore/my-jobs');
      return;
    }

    const applies = await Apply.find({
      job_id: __id,
      job_owner: _username,
      status: 'Đang duyệt',
    })
      .lean()
      .exec();

    const applied = await Apply.find({
      job_id: __id,
      job_owner: _username,
      status: 'Chấp nhận',
    })
      .lean()
      .exec();

    const noApply = applies.length == 0 ? true : false;
    const noApplied = applied.length == 0 ? true : false;

    res.locals = {
      ...res.locals,
      title: 'Danh sách ứng viên',
      job: job,
      applies: applies,
      noApply: noApply,
      applied: applied,
      noApplied: noApplied,
    };
    res.render('apply-list');
  }

  async response_apply(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    const __id = req.query._id;
    const _username = req.session.User.username;
    let value = req.query.value;

    if (value == 'approve') {
      value = 'Chấp nhận';
    } else {
      value = 'Từ chối';
    }

    const apply = await Apply.findOne({ _id: __id, job_owner: _username })
      .lean()
      .exec();

    if (apply == null) {
      res.redirect('/apply/apply-list?_id=' + apply.job_id);
      return;
    }

    Apply.updateOne({ _id: __id }, { status: value }).then(() => {
      res.redirect('/apply/apply-list?_id=' + apply.job_id);
    });
  }
}

module.exports = new ApplyController();
