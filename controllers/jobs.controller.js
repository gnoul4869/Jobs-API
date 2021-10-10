const Job = require('../models/job.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
    res.send('Get All Jobs');
};

const getJob = async (req, res) => {
    res.send('Get Job');
};

const deleteJob = async (req, res) => {
    res.send('Delete Job');
};

const updateJob = async (req, res) => {
    res.send('Update Job');
};

module.exports = { getAllJobs, getJob, createJob, deleteJob, updateJob };
