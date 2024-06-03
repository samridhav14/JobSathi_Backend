const router = require("express").Router();
const { verifyToken,verifyAndAuthorization } = require("../middleware/verifyToken");
const bookmarkController = require("../controllers/bookmarkController");


// CREATE BOOKMARKS
router.post("/",verifyAndAuthorization ,bookmarkController.createBookmark);


// DELETE BOOKMARKS

router.delete("/:id",verifyToken, bookmarkController.deleteBookmark);


// GET BOOKMARKS
router.get("/",verifyAndAuthorization, bookmarkController.getBookmarks);



module.exports = router