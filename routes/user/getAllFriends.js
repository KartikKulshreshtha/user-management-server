const express = require('express');
const router = express.Router()
const User = require('../../models/user')
const verifyToken = require('../../middleware/verifyToken')

router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('friends', 'username');
        res.json(user.friends);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching friends' });
    }
})

module.exports = router;