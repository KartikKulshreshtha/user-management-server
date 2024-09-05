const express = require('express');
const router = express.Router()
const User = require('../../models/user')
const verifyToken = require('../../middleware/verifyToken')

router.post('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        user.friendRequests = user.friendRequests.filter(id => id.toString() !== req.params.id);
        await user.save();
        res.json({ message: 'Friend request rejected' });
      } catch (error) {
        res.status(500).json({ error: 'Error rejecting friend request' });
      }
})

module.exports = router;