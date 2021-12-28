const express = require('express');
const router = express.Router();

const jobController = require('../app/controllers/JobController');

router.use('/new-job', jobController.new_job);
router.use('/create-job', jobController.create_job);
router.use('/', jobController.index);

module.exports = router;
