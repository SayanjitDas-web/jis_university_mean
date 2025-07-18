require("dotenv").config()

const User = require("../models/User.model")

exports.register = async (req, res) => {
    try{
      const {username, email, password} = req.body
      if(!username || !email || !password){
        return res.status(400).json({success: false, message:"all values are required"})
      }
      const user = await User.create({username, email, password})
      if(!user){
        return res.status(400).json({success: false, message:"somthing went wrong while creating the user"})
      }
      return res.status(200).json({success: true, message:"user registered!"})
    }catch(err){
      return res.status(500).json({success: false, message:err.message})
    }
}