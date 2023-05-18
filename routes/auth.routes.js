const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const User = require('../models/User.model');

router.get('/', (req, res, next) => {
    res.json('Test route, all good');
});

module.exports = router;