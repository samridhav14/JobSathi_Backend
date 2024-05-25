const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  location: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isAgent: {
    type: Boolean,
    default: false,
  },
  skills: {
    type: Array,
    required: false,
  },
  profile: {
    type: String,
    required: true,
    default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
}, { timestamps: true });
module.exports = mongoose.model("User", UserSchema);
