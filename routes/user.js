const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyAndAuthorization, verifyToken, verifyAndAdmin } = require("../middleware/verifyToken");

// UPDATE USER
// we use the verifyAndAuthorization middleware to check if the user is authenticated and if the user is the same as the user we want to update
router.put("/:id",verifyAndAuthorization ,userController.updateUser);
router.delete("/:id",verifyAndAuthorization ,userController.deleteUser);
router.get("/:id",verifyAndAuthorization ,userController.getUser);
router.get("/",verifyAndAdmin ,userController.getAllUsers);


module.exports = router;