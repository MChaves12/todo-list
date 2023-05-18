const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const User = require('../models/User.model');

router.get('/', (req, res, next) => {
    res.json('Test route, all good');
});

router.post('/signup', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        if(!username || !password) {
            res.status(400).json({message: 'Required fields'});
            return;
        }

        const passwordRegex =  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if(!passwordRegex.test(password)) {
            res.status(400).json({message: 'The password must have 6 caracters and at least 1 number, 1 uppercase letter and 1 lowercase letter'});
            return;
        }

        const user = await User.findOne({ username });
        if(user) {
            res.status(400).json({message: 'registered user. Try a new one'});
            return;
        }

        const hash = bcrypt.hashSync(password, 10);
        const newUser = await User.create({ username, passwordHash: hash });
        res.status(201).json({ _id, username: newUser.username });
    } catch (error) {
        next(error);
    }
})

module.exports = router;