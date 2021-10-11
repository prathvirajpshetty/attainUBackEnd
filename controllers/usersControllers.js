const User = require('../models/user.model')

const getAllUsers = async (req,res) =>{
  try{
    const users = await  User.find().populate("roles")
      res.status(200).json(users)
    }catch(error){
      res.status(500).json({success:false,message:error.mesage})
    }
}
module.exports = {
  getAllUsers,
}