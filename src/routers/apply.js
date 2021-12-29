const express = require('express');
const router = express.Router();

const applyController = require('../app/controllers/applyController');

router.use('/my-applies', applyController.my_applies);
router.use('/apply-job', applyController.apply_job);
router.use('/delete-apply', applyController.delete_apply);
router.use('/apply-list', applyController.apply_list);
router.use('/response-apply', applyController.response_apply);

module.exports = router;
