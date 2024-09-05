const express = require('express');
const router = express.Router()
const User = require('../../models/user')
const verifyToken = require('../../middleware/verifyToken')

router.post('/:id', verifyToken, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const friend = await User.findById(req.params.id);
        if (!user || !friend) {
          return res.status(404).json({ error: 'User not found' });
        }
        user.friendRequests = user.friendRequests.filter(id => id.toString() !== req.params.id);
        user.friends.push(req.params.id);
        friend.friends.push(req.user.id);
        await user.save();
        await friend.save();
        res.json({ message: 'Friend request accepted' });
      } catch (error) {
        res.status(500).json({ error: 'Error accepting friend request' });
      }
})

module.exports = router;