const Job = require('../models/Job');
const Location = require('../models/Location');
const Category = require('../models/Category');
const { redirect } = require('express/lib/response');

class JobController {
  // [GET] /explore
  index(req, res) {
    res.locals = { ...res.locals, title: 'Khám phá' };
    res.render('explore');
  }

  // [GET] /explore/job?_id=_id
  async info(req, res) {
    const __id = req.query._id;
    console.log(__id);

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

    console.log(job);
    res.locals = { ...res.locals, title: job.name, job: job };

    res.render('job');
  }

  // [GET] /explore/new-job
  async new_job(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    const categories = await Category.find({}).lean().exec();
    const locations = await Location.find({}).lean().exec();

    res.locals = {
      ...res.locals,
      title: 'Tạo công việc',
      categories: categories,
      locations: locations,
    };
    res.render('new-job');
  }

  // [POST] /explore/create-job
  create_job(req, res) {
    const job = new Job(req.body);
    job.save();
    res.redirect('/explore/my-jobs');
  }

  // [POST] /explore/edit-job?_id=_id
  async edit_job(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    const __id = req.query._id;

    const job = await Job.findOne({
      _id: __id,
      posted_by: req.session.User.username,
    })
      .lean()
      .exec();

    const categories = await Category.find({}).lean().exec();
    const locations = await Location.find({}).lean().exec();

    res.locals = {
      ...res.locals,
      title: 'Chỉnh sửa công việc',
      categories: categories,
      locations: locations,
      job: job,
    };

    res.render('edit-job');
  }

  // [POST] /explore/save-edit-job?_id=_id
  async save_edit_job(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    const __id = req.query._id;

    const job = await Job.updateOne(
      {
        _id: __id,
        posted_by: req.session.User.username,
      },
      req.body
    );

    res.redirect('/explore/my-jobs');
  }

  // [POST] /explore/delete-job?_id=_id
  async delete_job(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    const __id = req.query._id;

    const job = await Job.find({
      _id: __id,
      posted_by: req.session.User.username,
    })
      .lean()
      .exec();

    console.log(job);

    if (job == null) {
      res.redirect('/');
      return;
    }

    Job.deleteOne({ _id: __id }).then(() => {
      res.redirect('/explore/my-jobs');
    });
  }

  // [GET]  /explore/my-jobs
  async my_jobs(req, res) {
    if (!req.session.User) {
      res.redirect('/');
      return;
    }

    const _username = req.session.User.username;

    const jobs = await Job.find({ posted_by: _username }).lean().exec();

    res.locals = { ...res.locals, title: 'Công việc của tôi', jobs: jobs };
    res.render('my-jobs');
  }
}

module.exports = new JobController();
