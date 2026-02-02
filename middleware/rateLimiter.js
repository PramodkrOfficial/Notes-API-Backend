const rateLimit = require('express-rate-limit');

const createNoteRateLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 5, 
    message: {
        success: false,
        error: 'Too many notes created. Maximum 5 note creations per minute allowed.',
        retryAfter: '1 minute'
    },
    standardHeaders: true, 
    legacyHeaders: false, 

    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: 'Too many notes created. Maximum 5 note creations per minute allowed.',
            retryAfter: '1 minute'
        });
    }
});

module.exports = {
    createNoteRateLimiter
};