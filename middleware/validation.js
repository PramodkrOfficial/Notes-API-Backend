const { body, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors.array().map(err => err.msg)
        });
    }

    next();
};


const validateCreateNote = [
    body('title')
        .exists().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .trim()
        .notEmpty().withMessage('Title cannot be empty or contain only spaces'),

    body('content')
        .exists().withMessage('Content is required')
        .isString().withMessage('Content must be a string')
        .trim()
        .notEmpty().withMessage('Content cannot be empty or contain only spaces'),

    handleValidationErrors
];


const validateUpdateNote = [
    body('title')
        .optional()
        .isString().withMessage('Title must be a string')
        .trim()
        .notEmpty().withMessage('Title cannot be empty or contain only spaces'),

    body('content')
        .optional()
        .isString().withMessage('Content must be a string')
        .trim()
        .notEmpty().withMessage('Content cannot be empty or contain only spaces'),

  
    body()
        .custom((value, { req }) => {
            if (!req.body.title && !req.body.content) {
                throw new Error('At least one field (title or content) must be provided');
            }
            return true;
        }),

    handleValidationErrors
];


const validateSearch = [
    query('q')
        .exists().withMessage('Search query parameter "q" is required')
        .isString().withMessage('Search query must be a string')
        .trim()
        .notEmpty().withMessage('Search query cannot be empty or contain only spaces'),

    handleValidationErrors
];

module.exports = {
    validateCreateNote,
    validateUpdateNote,
    validateSearch
};
