const router = require("express").Router();
const messageController = require("../controllers/messagesController");
const { verifyTokenAndAuthorization, verifyToken } = require("../middleware/verifyToken");



// CREATE CHAT
//router.post("/", verifyToken, chatController.acessMessage);


// GET CHAT
//router.get("/", verifyToken, chatController.getChat);


module.exports = router