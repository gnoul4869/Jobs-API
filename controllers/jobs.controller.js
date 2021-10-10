const Job = require('../models/job.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort(
        'createdAt'
    );
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs });
};

const getJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
    res.send('Update Job');
};

const deleteJob = async (req, res) => {
    res.send('Delete Job');
};

module.exports = { getAllJobs, getJob, createJob, deleteJob, updateJob };
