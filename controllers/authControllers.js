
const mongoose = require('mongoose')
const User =require('../models/user.model');
require('dotenv').config({path: '.env'})
const jwt =require('jsonwebtoken');


const login = async (req, res) => {
  try {
    const userFound = await User.findOne({email: req.body.email }).populate("roles").populate('orders');
      if (!userFound) return res.status(400).json({ message: "User Not Found"});
      const matchPassword = await User.comparePassword(
        req.body.password, userFound.password );
        if (!matchPassword)
        return res.status(401).json({
          token: null,
          message: "Invalid Password",
        });
        const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: 86400, 
        });
        res.status(200).json({ token: token ,roles: userFound.roles ,user:userFound});
      } catch (error) {
        console.log(error);
        return  res.status(500).json({message:error})
      }
    };
  
    
    module.exports = {login}