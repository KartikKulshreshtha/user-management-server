const express = require('express');
const router = express.Router();
const authRoute = require('./auth/auth')
const userRoute = require('./user/user')

router.use('/auth', authRoute);
router.use('/user', userRoute);

module.exports = router