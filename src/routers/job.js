const express = require('express');
const router = express.Router();

const jobController = require('../app/controllers/JobController');

router.use('/new-job', jobController.new_job);
router.use('/create-job', jobController.create_job);
router.use('/my-jobs', jobController.my_jobs);
router.use('/delete-job', jobController.delete_job);
router.use('/edit-job', jobController.edit_job);
router.use('/save-edit-job', jobController.save_edit_job);
router.use('/', jobController.index);

module.exports = router;
