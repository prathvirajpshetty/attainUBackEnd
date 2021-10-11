const jwt = require('jsonwebtoken');
const User = require('../models/user.model')
// const TemporalUser =require('../models/temporalUser.model');

const verifyToken = async (req,res,next) =>{
  
  try{ 
      let token;
      if ( req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
          token = req.headers.authorization.split(" ")[1];
        }
      if(!token) return res.status(401).json({message:"No token provided"})
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.userId = decoded.id
      const user = await User.findById(req.userId,{password:0})
      if(!user) return res.status(404).json({message:"No user faund"} )
      next()
    }catch(err){
      console.log(err)
      res.status(401).json({message: "Unauthorized"})
    }
  }
  
  module.exports = {verifyToken}