const getAllJobs = async (req, res) => {
    res.send('Get All Jobs');
};

const getJob = async (req, res) => {
    res.send('Get Job');
};

const createJob = async (req, res) => {
    res.send('Create Job');
};

const deleteJob = async (req, res) => {
    res.send('Delete Job');
};

const updateJob = async (req, res) => {
    res.send('Update Job');
};

module.exports = { getAllJobs, getJob, createJob, deleteJob, updateJob };
