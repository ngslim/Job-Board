const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.use('/profile', userController.index);

module.exports = router;
