// validators/noteValidator.js
const { check, validationResult } = require('express-validator');
const sendResponse = require('../../utility/response'); // Update the path as needed

const validateNote = [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
];

/**
 * Middleware for validating note data.
 *
 * @param {import('express').Request} req - Express Request object.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Express NextFunction middleware.
 */
const validate = (req, res, next) => {
    // Run the validations
    Promise.all(validateNote.map(validation => validation.run(req))).then(() => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Use sendResponse to send validation errors
            sendResponse(res, 'error', 400, 'Validation failed', null, errors.array());
        } else {
            // Proceed to the next middleware or route handler
            next();
        }
    });
};

module.exports = { validateNote, validate };
