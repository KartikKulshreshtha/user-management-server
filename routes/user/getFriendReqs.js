const express = require('express');
const router = express.Router()
const User = require('../../models/user')
const verifyToken = require('../../middleware/verifyToken')

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friendRequests', 'username');
        res.json(user.friendRequests);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching friend requests' });
      }
})

module.exports = router;