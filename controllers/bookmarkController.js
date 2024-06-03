const Bookmark = require("../models/Bookmark");
module.exports = {
  createBookmark: async (req, res) => {
    const jobID = req.body.job;
    try {
      const job=await Job.findById(jobID);
      if(!job) return res.status(400).json("Job not found");
      const newBook = new Bookmark({
        job: job,
        userId: req.user.id,
      });
      const savedBookmark = await newBook.save();
      const{__v,updatedAt, ...newBookmarkInfo} = savedBookmark._doc;
      res.status(200).json(newBookmarkInfo)
    } catch (err) {
      res.status(500).json(err);
    }
  },
    deleteBookmark: async (req, res) => {
        try {
       await Bookmark.findByIdAndDelete(req.params.id);
        res.status(200).json("Bookmark has been deleted..."); 
        } catch (err) {
        res.status(500).json(err);
        }
    },
    getBookmarks: async (req, res) => {
        try {
            const bookmarks = await Bookmark.find({userId: req.user.id});
            res.status(200).json(bookmarks);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
