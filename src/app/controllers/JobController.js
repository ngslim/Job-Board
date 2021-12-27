class JobController {
  // [GET] /
  index(req, res) {
    res.locals = { ...res.locals, title: 'Title' };
    res.render('explore');
  }
}

module.exports = new JobController();
