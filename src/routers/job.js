const express = require('express');
const router = express.Router();

const jobController = require('../app/controllers/JobController');

router.use('/', jobController.index);

module.exports = router;
