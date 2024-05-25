const router = require("express").Router();
const jobController = require("../controllers/jobController");
const { verifyAndAuthorization, verifyToken, verifyAndAdmin } = require("../middleware/verifyToken");

// Post a job
 router.post("/", verifyAndAdmin, jobController.createJob);
// Update a job
 router.put("/:id", verifyAndAdmin, jobController.updateJob);
// Delete a job
 router.delete("/:id", verifyAndAdmin, jobController.deleteJob);
//  Get a job
 router.get("/:id", jobController.getJob);
//  Get all jobs
 router.get("/", jobController.getAllJobs);
 // search job
 router.get("/search/:key", jobController.searchJob);


module.exports = router;