const express = require('express');
const router = express.Router();
const NotesController = require('../controllers/notesController');
const { createNoteRateLimiter } = require('../middleware/rateLimiter');
const {
    validateCreateNote,
    validateUpdateNote,
    validateSearch
} = require('../middleware/validation');

router.post(
    '/',
    createNoteRateLimiter,
    validateCreateNote,
    NotesController.createNote
);

router.get(
    '/search',
    validateSearch,
    NotesController.searchNotes
);

router.get(
    '/',
    NotesController.getAllNotes
);

router.put(
    '/:id',
    validateUpdateNote,
    NotesController.updateNote
);

module.exports = router;