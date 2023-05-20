const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();


//Middleware

const { isAuthenticated } = require('../middlewares/jwt.middleware')

const User = require('../models/User.model');

router.get('/', (req, res, next) => {
    res.json('Test route, all good');
})

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
        const newUser = await User.create({ username, password: hash });
        res.status(201).json({ _id: newUser._id, username: newUser.username });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async(req, res, next) => {
    const { username, password } = req.body;
    
    try {
        if(!username || !password) {
            res.status(400).json({message: 'Required fields'});
            return;  
        }
        
        const findUser = await User.findOne({ username });
        if(!findUser) {
            res.status(400).json({message: 'Username or password incorrect'});
            return;
        }

        const verifyPassword = bcrypt.compareSync(password, findUser.password);
        if(!verifyPassword) {
            res.status(400).json({message: 'Username or password incorrect'});
            return;
        }

        const payload = {
            _id: findUser._id,
            username: findUser.username 
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '6h'})

        res.status(200).json({ authToken: token });
    } catch (error) {
        next(error)
    }
});

router.get('/verify', isAuthenticated, (req, res, next) => {
    res.json(req.payload);
});

module.exports = router;
