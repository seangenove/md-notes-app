const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('./../../models/User');

const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// @route   GET /api/users
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('User route'));

// @route   POST api/users/register
// @desc    Register user 
// @access  Public
router.post('/register', [
    check('first_name', 'First name is required and should be a string').not().isEmpty().isString(),
    check('last_name', 'Last name is required  and should be a string').not().isEmpty().isString(),
    check('email', 'Please include a valid email').not().isEmpty().isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { first_name, last_name, email, password } = req.body;

    try {

        // see if user exists 
        let user = await User.query().findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }

        const userObj = { first_name, last_name, email, password };

        // encrypt user password using bcrpytjs 
        const salt = await bcrypt.genSalt(10); // generate salt with 10 rounds 
        userObj.password = await bcrypt.hash(password, salt);

        user = await User.query().insert(userObj);

        return res.status(200).json({ msg: 'Successful registration!' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

module.exports = router;