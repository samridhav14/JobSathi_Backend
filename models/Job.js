const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    location: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    description: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
    company: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    contract: {
      type: String,
      required: true,
    },
    requirements: {
      type: Array,
      required: true,
    },
    imageUrls: {
      type: String,
      required: true,
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Job", JobSchema);
