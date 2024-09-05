const express = require('express');
const router = express.Router()
const User = require('../../models/user')
const verifyToken = require('../../middleware/verifyToken')

router.post('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        if (user.friendRequests.includes(req.user.id)) {
          return res.status(400).json({ error: 'Friend request already sent' });
        }
        user.friendRequests.push(req.user.id);
        await user.save();
        res.json({ message: 'Friend request sent' });
      } catch (error) {
        res.status(500).json({ error: 'Error sending friend request' });
      }
})

module.exports = router;