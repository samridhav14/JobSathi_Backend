const router = require("express").Router();
const messageController = require("../controllers/messageController");
const { verifyTokenAndAuthorization, verifyToken } = require("../middleware/verifyToken");



// CREATE MESSAGE
router.post("/", verifyToken, messageController.sendMessage);


// ALL MESSAGES
router.get("/:id", verifyToken, messageController.allMessages);


module.exports = router