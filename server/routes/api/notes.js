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
// @desc    All notes for user
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

// @route   GET /api/notes/:note_id
// @desc    Delete note
// @access  Private
router.get('/:note_id', auth, async (req, res) => {

    // see if user exists 
    let user = await User.query().findOne({ id: req.user.id });

    if (!user) {
        return res.status(400).json({ errors: [{ msg: "Non existent user" }] });
    }

    try {
        let note = await Note.query().findOne({ id: req.params.note_id });

        if (!note) {
            return res.status(400).json({ errors: [{ msg: "Non existent note" }] });
        }

        if (note.user_id !== req.user.id) {
            return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
        }

        return res.status(200).json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

// @route   POST /api/notes/upsert
// @desc    Upsert note
// @access  Private
router.get('/upsert', auth, [
    check('title', 'Title is required').not().isEmpty().isString(),
    check('text', 'Text is required').not().isEmpty().isString(),
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // see if user exists 
    let user = await User.query().findOne({ id: req.user.id });

    if (!user) {
        return res.status(400).json({ errors: [{ msg: "Non existent user" }] });
    }

    try {
        const note = await Note.query().insert({ title, text });

        if (note.user_id !== req.user.id) {
            return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
        }

        return res.status(200).json({ note });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

// @route   POST /api/notes/delete/:note_id
// @desc    Delete note
// @access  Private
router.get('/delete/:note_id', auth, async (req, res) => {

    // see if user exists 
    let user = await User.query().findOne({ id: req.user.id });

    if (!user) {
        return res.status(400).json({ errors: [{ msg: "Non existent user" }] });
    }

    try {
        let note = await Note.query().findOne({ id: req.params.note_id });

        if (!note) {
            return res.status(400).json({ errors: [{ msg: "Non existent note" }] });
        }

        if (note.user_id !== req.user.id) {
            return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
        }

        const deleted_at = new Date().toISOString();

        note = await ProductCategory.query()
            .patchAndFetchById(req.params.note_id, { deleted_at });

        return res.status(200);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }

});

module.exports = router;