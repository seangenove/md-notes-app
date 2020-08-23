const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const auth = require('./../../middleware/auth');

const Note = require('./../../models/Note');
const User = require('./../../models/User');

const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// @route   GET /api/notes
// @desc    Test route
// @access  Private
router.get('/', auth, async (req, res) => {

    try {

        // see if user exists 
        let user = await User.query().findOne({ id: req.user.id });

        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Non existent user" }] });
        }

        // get all Notes of User
        const notes = await Note.query().where('id', '=', req.user.id);

        return res.status(200).json({ notes });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

module.exports = router;