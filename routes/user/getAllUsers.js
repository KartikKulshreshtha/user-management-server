const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const verifyToken = require('../../middleware/verifyToken');

router.get('/', verifyToken, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const users = await User.find({ _id: { $ne: req.user.id } }).select('-password');

        const usersWithStatus = users.map(user => {
            let status = 'not_friend';
            if (currentUser.friends.includes(user._id)) {
                status = 'friend';
            } else if (currentUser.friendRequests.includes(user._id)) {
                status = 'incoming_request';
            } else if (user.friendRequests.includes(currentUser._id)) {
                status = 'outgoing_request';
            }
            return {
                ...user.toObject(),
                status
            };
        });

        res.json(usersWithStatus);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

module.exports = router;