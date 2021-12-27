const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/AuthController');

router.use('/login', authController.login);
router.post('/verify', authController.verify);
router.use('/register', authController.register);
router.use('/logout', authController.logout);

module.exports = router;
