const Job = require('../models/Job');
const Location = require('../models/Location');
const Category = require('../models/Category');
const { query } = require('express');
const { forEach } = require('handlebars-helpers/lib/array');

class JobController {
  // [GET] /explore
  async index(req, res, next) {
    const PAGE_SIZE = 5;
    var total = await Job.countDocuments({});
    var totalPage = [];
    for (var i = 0; i <= (total - 1) / PAGE_SIZE; ++i) {
      totalPage.push({ page: i + 1 });
    }
    var page = req.query.page;
    if (page) {
      page = parseInt(page);
    } else {
      page = 1;
    }
    var skip = (page - 1) * PAGE_SIZE;

    const jobs = await Job.find({}).skip(skip).limit(PAGE_SIZE).lean().exec();
    const categories = await Category.find({}).lean().exec();
    const locations = await Location.find({}).lean().exec();

    res.locals = {
      ...res.locals,
      title: 'Khám phá',
      jobs,
      categories,
      locations,
      totalPage,
      page,
    };
    //res.json(jobs);
    res.render('explore');
  }

  // [GET] /explore/job?_id=_id
  async info(req, res) {
    const __id = req.query._id;

    const job = await Job.findOne({
      _id: __id,
    })
      .lean()
      .exec();

    if (job === null) {
      res.locals = { ...res.locals, title: 'Lỗi' };
      res.render('404');
      return;
    }

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

    if (jobs.length == 0) {
      res.redirect('/no-job');
      return;
    }

    res.locals = { ...res.locals, title: 'Công việc của tôi', jobs: jobs };
    res.render('my-jobs');
  }

  // [GET] /explore/search?name=
  async search_jobs(req, res, next) {
    const _name = req.query.name;

    const jobs = await Job.find({
      name: { $regex: _name, $options: 'i' },
    })
      .lean()
      .exec();

    let noMatch = false;

    if (jobs.length == 0) {
      noMatch = true;
    }

    const categories = await Category.find({}).lean().exec();
    const locations = await Location.find({}).lean().exec();

    res.locals = {
      ...res.locals,
      title: 'Khám phá',
      jobs: jobs,
      categories: categories,
      locations: locations,
      noMatch: noMatch,
    };
    res.render('explore');
  }

  // [GET] /explore/filter
  async filter_jobs(req, res, next) {
    var _category = req.query.categoryInput;
    var _location = req.query.locationInput;
    var _salary = req.query.salaryInput;
    var locationArray = _location.split(',');
    var jobs;
    let noMatch = false;
    const PAGE_SIZE = 5;

    var total;
    var totalPage = [];

    if (locationArray[0] == '') {
      if (_salary == '1') {
        total = await Job.countDocuments({
          category: { $regex: _category, $options: 'i' },
          salary: { $gte: 500000 },
        });
      } else if (_salary == '0') {
        total = await Job.countDocuments({
          category: { $regex: _category, $options: 'i' },
          salary: { $lte: 500000 },
        });
      } else {
        total = await Job.countDocuments({
          category: { $regex: _category, $options: 'i' },
        });
      }
    } else {
      if (_salary == '1') {
        total = await Job.countDocuments({
          category: { $regex: _category, $options: 'i' },
          location: { $in: locationArray },
          salary: { $gte: 500000 },
        });
      } else if (_salary == '0') {
        total = await Job.countDocuments({
          category: { $regex: _category, $options: 'i' },
          location: { $in: locationArray },
          salary: { $lte: 500000 },
        });
      } else {
        total = await Job.countDocuments({
          category: { $regex: _category, $options: 'i' },
          location: { $in: locationArray },
        });
      }
    }

    for (var i = 0; i <= (total - 1) / PAGE_SIZE; ++i) {
      totalPage.push({ page: i + 1 });
    }

    var page = req.query.page;
    if (page) {
      page = parseInt(page);
    } else {
      page = 1;
    }
    var skip = (page - 1) * PAGE_SIZE;

    if (locationArray[0] == '') {
      if (_salary == '1') {
        jobs = await Job.find({
          category: { $regex: _category, $options: 'i' },
          salary: { $gte: 500000 },
        })
          .skip(skip)
          .limit(PAGE_SIZE)
          .lean()
          .exec();
      } else if (_salary == '0') {
        jobs = await Job.find({
          category: { $regex: _category, $options: 'i' },
          salary: { $lte: 500000 },
        })
          .skip(skip)
          .limit(PAGE_SIZE)
          .lean()
          .exec();
      } else {
        jobs = await Job.find({
          category: { $regex: _category, $options: 'i' },
        })
          .skip(skip)
          .limit(PAGE_SIZE)
          .lean()
          .exec();
      }
    } else {
      if (_salary == '1') {
        jobs = await Job.find({
          category: { $regex: _category, $options: 'i' },
          location: { $in: locationArray },
          salary: { $gte: 500000 },
        })
          .skip(skip)
          .limit(PAGE_SIZE)
          .lean()
          .exec();
      } else if (_salary == '0') {
        jobs = await Job.find({
          category: { $regex: _category, $options: 'i' },
          location: { $in: locationArray },
          salary: { $lte: 500000 },
        })
          .skip(skip)
          .limit(PAGE_SIZE)
          .lean()
          .exec();
      } else {
        jobs = await Job.find({
          category: { $regex: _category, $options: 'i' },
          location: { $in: locationArray },
        })
          .skip(skip)
          .limit(PAGE_SIZE)
          .lean()
          .exec();
      }
    }

    if (jobs.length == 0) {
      noMatch = true;
    }

    const categories = await Category.find({}).lean().exec();
    const locations = await Location.find({}).lean().exec();

    res.locals = {
      ...res.locals,
      title: 'Khám phá',
      jobs: jobs,
      categories: categories,
      locations: locations,
      totalPage,
      page,
      noMatch: noMatch,
      _category,
      _location,
      _salary,
    };
    res.render('filter');
  }
}

module.exports = new JobController();
