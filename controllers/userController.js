const User = require("../models/User");
const CryptoJs = require("crypto-js");
module.exports = {
  updateUser: async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString();
    }
    console.log(req.body);
    try {
      const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        $set: req.body,
      });
      console.log(updatedUser);
      const { password, __v, createdAt, ...info } = updatedUser._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      console.log(user);
      const { password, __v, createdAt, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
