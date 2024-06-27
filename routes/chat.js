const router = require("express").Router();
const chatController = require("../controllers/chatController");
const { verifyTokenAndAuthorization, verifyToken } = require("../middleware/verifyToken");



// CREATE CHAT
router.post("/", verifyToken, chatController.accessChat);


// GET CHAT
router.get("/", verifyToken, chatController.getChat);


module.exports = router