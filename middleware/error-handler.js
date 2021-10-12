// const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { custom } = require('joi');

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, please try again later',
    };

    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({ msg: err.message });
    // }

    if (err.name === 'ValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = Object.values(err.errors).map((item) => item.message);
    }

    if (err.code && err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        // customError.msg = 'This email has already been registered';
        customError.msg = `Duplicate value for ${Object.keys(
            err.keyValue
        )} field`;
    }

    if (err.name === 'CastError') {
        customError.statusCode = StatusCodes.NOT_FOUND;
        customError.msg = `No item found with id ${err.value}`;
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
