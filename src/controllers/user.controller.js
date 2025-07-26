require("dotenv").config();

const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all values are required" });
    }
    const user = await User.create({ username, email, password });
    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "somthing went wrong while creating the user",
        });
    }
    return res.status(200).json({ success: true, message: "user registered!" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all values are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "invalid credentials" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(401)
        .json({ success: false, message: "wrong password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      expire: new Date(Date.now() * 30 * 24 * 60 * 60 * 1000),
    });

    res
      .status(200)
      .json({ success: true, message: "user loged in successfully", token });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMe = async (req, res) =>{
  try{
    const {_id} = req.user
    if(!_id){
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const user = await User.findById(_id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "invalid id" });
    }

    res
      .status(200)
      .json({ success: true, user });

  }catch(err){

  }
}

exports.logout = async (req, res) =>{
  try{
    res.clearCookie("token")
    res.status(200).json({success: true, message:"user loged out successfully"})
  }catch(err){
    res.status(500).json({success: false, message:err.message})
  }
}