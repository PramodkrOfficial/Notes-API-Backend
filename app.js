const express = require('express');
const notesRoutes = require('./routes/notes');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');


function createApp() {
    const app = express();

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use((req, res, next) => {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${req.method} ${req.path}`);
        next();
    });

    app.get('/', (req, res) => {
        res.json({
            success: true,
            message: 'Notes API is running',
            version: '1.0.0',
            endpoints: {
                createNote: 'POST /notes',
                getAllNotes: 'GET /notes',
                updateNote: 'PUT /notes/:id',
                searchNotes: 'GET /notes/search?q=query'
            }
        });
    });

    app.use('/notes', notesRoutes);

    app.use(notFoundHandler);

    app.use(errorHandler);

    return app;
}

module.exports = createApp;