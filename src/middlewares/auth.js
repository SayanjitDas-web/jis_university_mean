require("dotenv").config()

const jwt = require("jsonwebtoken")

const auth = (req, res, next) =>{
    let token;

    const authHeader = req.headers.authorization
    if(authHeader && authHeader.startsWith('Bearer ')){
        token = authHeader.split(" ")[1]
    }
    else if(req.cookies && req.cookies.token){
        token = req.cookies.token
    }

    if(!token){
        res.status(401).json({success: false, message:"unauthorized access. token not found"})
    }

    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
    }catch(err){
       res.status(500).json({success: false, message:"invalid token"})
    }
    next()
}

module.exports = auth