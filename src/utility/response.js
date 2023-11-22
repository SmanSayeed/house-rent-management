// response.js

/**
 * Sends a JSON response with the provided data, status, and optional errors.
 *
 * @param {import('express').Response} res - Express Response object.
 * @param {string} status - The status of the response ('success' or 'error').
 * @param {number} statusCode - The status code of the response.
 * @param {string} message - The message associated with the response.
 * @param {any} [data=null] - The data to include in the response (optional).
 * @param {any} [errors=null] - The errors to include in the response (optional).
 * @returns {import('express').Response} - Express Response object.
 */
const sendResponse = (res, status, statusCode, message, data = null, errors = null) => {
    const responseObj = {
        status: String(status),
        statusCode: Number(statusCode),
        message: String(message),
        data: data !== null ? data : undefined,
        errors: errors !== null ? errors : undefined,
    };

    return res.status(responseObj.statusCode).json(responseObj);
};

module.exports = sendResponse;
