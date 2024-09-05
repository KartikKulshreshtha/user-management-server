const express = require('express');
const router = express.Router()
const getAllUsers = require('./getAllUsers');
const acceptRequest = require('./acceptRequest');
const rejectRequest = require('./rejectRequest');
const sendFriendReq = require('./sendFriendReq');
const getAllFriends = require('./getAllFriends');
const getFriendReqs = require('./getFriendReqs');

router.use('/getAllUsers',getAllUsers)
router.use('/acceptRequest',acceptRequest)
router.use('/rejectRequest',rejectRequest)
router.use('/sendFriendReq',sendFriendReq)
router.use('/getAllFriends',getAllFriends)
router.use('/getFriendReqs',getFriendReqs)


module.exports = router;