const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: [true, 'Please provide a company'],
            maxlength: 50,
        },
        position: {
            type: String,
            required: [true, 'Please provide a position'],
            maxlength: 100,
        },
        status: {
            type: String,
            enum: ['interview', 'pending', 'declined'],
            default: 'pending',
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: ['true', 'Please provide a user'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Job', jobSchema);
