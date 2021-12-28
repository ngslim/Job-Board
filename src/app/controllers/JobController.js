class JobController {
  // [GET] /
  index(req, res) {
    res.locals = { ...res.locals, title: 'Khám phá' };
    res.render('explore');
  }
}

module.exports = new JobController();
