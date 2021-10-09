require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('../errors');

const auth = async (res, req, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AuthenticationError('Invalid authentication');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, name: payload.name };
        next();
    } catch (error) {
        throw new AuthenticationError('Invalid authentication');
    }
};

module.exports = auth;
