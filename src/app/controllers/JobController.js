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
      return;
    }

    res.locals = { ...res.locals, title: 'Tạo công việc' };
    res.render('new-job');
  }

  // [POST] /explore/create-job
  create_job(req, res) {
    const job = new Job(req.body);
    job.save();
    res.redirect('/explore/my-jobs');
  }

  // [POST] /explore/update-job?q=_id

  // [GET]  /explore/my-jobs
  async my_jobs(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    const _username = req.session.User.username;

    const jobs = await Job.find({ posted_by: _username }).lean().exec();

    jobs.forEach((element) => {
      console.log(element);
    });

    res.locals = { ...res.locals, title: 'Công việc của tôi', jobs: jobs };
    res.render('my-jobs');
  }
}

module.exports = new JobController();
