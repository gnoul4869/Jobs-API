const User = require('../models/user.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, AuthenticationError } = require('../errors');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = await user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new AuthenticationError('Invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new AuthenticationError('Invalid credentials');
    }

    const token = user.createJWT();

    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
