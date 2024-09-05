const express = require('express');
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
})

module.exports = router;