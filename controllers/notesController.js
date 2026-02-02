const { NoteRepository } = require('../models/Note');

class NotesController {
 
    static async createNote(req, res, next) {
        try {
            const { title, content } = req.body;

            const note = NoteRepository.create(title, content);

            res.status(201).json({
                success: true,
                message: 'Note created successfully',
                data: note
            });
        } catch (error) {
     
            next(error);
        }
    }

    static async getAllNotes(req, res, next) {
        try {
         
            const notes = NoteRepository.getAll();

            res.status(200).json({
                success: true,
                count: notes.length,
                data: notes
            });
        } catch (error) {
            next(error);
        }
    }

  
    static async updateNote(req, res, next) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const result = NoteRepository.update(id, updates);

            if (!result) {
                return res.status(404).json({
                    success: false,
                    error: 'Note not found'
                });
            }

            if (!result.wasUpdated) {
                return res.status(200).json({
                    success: true,
                    message: 'No changes detected. Note remains unchanged.',
                    wasUpdated: false,
                    data: result.note
                });
            }

     
            res.status(200).json({
                success: true,
                message: 'Note updated successfully',
                wasUpdated: true,
                data: result.note
            });
        } catch (error) {
            next(error);
        }
    }

   
    static async searchNotes(req, res, next) {
        try {
            const { q } = req.query;

            const results = NoteRepository.search(q);

            res.status(200).json({
                success: true,
                query: q.trim(),
                count: results.length,
                data: results
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = NotesController;