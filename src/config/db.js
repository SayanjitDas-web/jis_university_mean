require("dotenv").config()

const mongoose = require("mongoose")

const connectDB = async () => {
    try{
      const connection = await mongoose.connect(process.env.MONGO_URI)
      console.log("mongoDB connected at: ",connection.connection.port)
    }catch(err){
       console.log("connection error:",err)
    }
}

module.exports = connectDB