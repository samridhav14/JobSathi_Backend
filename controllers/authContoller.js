const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
module.exports = {
  createUser: async (req, res) => {
    const {
      username,
      email,
      password,
      location,
      isAdmin,
      isAgent,
      skills,
      profile,
    } = req.body;
    const user = new User({
      username,
      email,
      password: CryptoJs.AES.encrypt(password, process.env.SECRET).toString(),
    });
    try {
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      
      if(!user) {  return res.status(401).json("Wrong credentials!");}
      const decryptedpass = CryptoJs.AES.decrypt(
        user.password,
        process.env.SECRET
      ); 
    
      
      const depassword = decryptedpass.toString(CryptoJs.enc.Utf8);
      if(depassword !== req.body.password) return res.status(401).json("Wrong credentials!");
      // we use spread operator to get all the properties of the user object except the password we dont want to send the password to the client
      const userToken = jwt.sign(
         {
           id: user._id,
           isAdmin: user.isAdmin,
           isAgent: user.isAgent,
         },
         process.env.SECRET,
         { expiresIn: '21d' }
       );

     //res.cookie("token", token, { httpOnly: true });
      const { password, __v, createdAt, ...info } = user._doc;
     return res.status(200).json({ ...info, userToken});
    } catch (err) {
     return res.status(500).json(err);
    }
  },
};
