const Job = require("../models/Job");
module.exports = {
  createJob: async (req, res) => {
    const newJob = new Job(req.body);
    try {
      const savedJob = await newJob.save();
      const { __v, createdAt, updatedAt, ...info } = savedJob._doc;
      res.status(201).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateJob: async (req, res) => {
    try {
      const updatedJob = await Job.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { __v, createdAt, updatedAt, ...info } = updatedJob._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  },
    deleteJob: async (req, res) => {
        try {
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json("Job has been deleted...");
        } catch (err) {
        res.status(500).json(err);
        }
    },
    getJob: async (req, res) => {
        try {
        const job = await Job.findById(req.params.id);
        const { __v, createdAt, updatedAt, ...info } = job._doc;
        res.status(200).json(info);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    getAllJobs: async (req, res) => {
        try {
        const jobs =  await Job.find();
        res.status(200).json(jobs);
        } catch (err) {
        res.status(500).json(err);
        }
    },
    searchJob: async (req, res) => {
        try {
        const results = await Job.aggregate(
            [
                {
                  $search: {
                    index: "jobsearch",
                    text: {
                      query: req.params.key,
                      path: {
                        wildcard: "*"
                      }
                    }
                  }
                }
              ]
        )
        res.status(200).json(results);
        } catch (err) {
        res.status(500).json(err);
        }
    },
};
