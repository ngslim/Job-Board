const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.use('/404', siteController.error_404);
router.use('/no-job', siteController.error_no_job);
router.use('/no-apply', siteController.error_no_apply);
router.use('/error', siteController.error);
router.use('/test', siteController.test);
router.use('/', siteController.index);

module.exports = router;
