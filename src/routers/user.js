const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.use('/test', userController.index);
router.use('/profile', userController.profile);
router.post('/update', userController.update);

module.exports = router;
