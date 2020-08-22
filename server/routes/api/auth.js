const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const auth = require('./../../middleware/auth');

const User = require('./../../models/User');

const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.query().findOne({ id: req.user.id });
        res.json(user);
    } catch (error) {
        res.status(400).json({ errors: { msg: "User not found" } });
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user and get token 
// @access  Public
router.post('/login', [
    check('email', 'Please include a valid email').not().isEmpty().isEmail(),
    check('password', 'Password is required').exists(),
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        // see if user exists 
        let user = await User.query().findOne({ email });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }

        // return json web token 

        const payload = {
            user: {
                id: user.id,
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 3600 * 100 }, // 3600 seconds * 100 
            (err, token) => {
                if (err) throw err;
                res.json({
                    user: {
                        'first_name': user.first_name,
                        'last_name': user.last_name,
                        'email': user.email,
                        token
                    }
                });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

module.exports = router;