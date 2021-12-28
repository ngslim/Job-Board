const Job = require('../models/Job');

class JobController {
  // [GET] /explore
  index(req, res) {
    res.locals = { ...res.locals, title: 'Khám phá' };
    res.render('explore');
  }

  // [GET] /explore/job?q=id
  async info(req, res) {
    const __id = req.query.q;

    const job = await Job.findOne({
      _id: __id,
    })
      .lean()
      .exec();

    if (job === null) {
      res.locals = { ...res.locals, title: 'Lỗi' };
      res.render('error');
      return;
    }

    res.locals = { ...res.locals, title: job.name, job: job };

    res.render('job');
  }

  // [GET] /explore/new-job
  new_job(req, res) {
    if (!req.session.User) {
      res.redirect('/');
    }

    res.locals = { ...res.locals, title: 'Tạo công việc' };
    res.render('new-job');
  }

  // [POST] /explore/create-job
  create_job(req, res) {
    res.json(req.body);
  }

  // [POST] /update-job
}

module.exports = new JobController();
