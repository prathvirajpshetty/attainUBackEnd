const Product = require('../models/product.model');
const fs = require("fs")
const path = require('path');

// const cloudinary = require('cloudinary')
// //cloudinary config
// cloudinary.config({
//   cloud_name:process.env.CLOUDINARY_NAME,
//   api_key:process.env.CLOUDINARY_KEY,
//   api_secret:process.env.CLOUDINARY_SECRET
// })

const getAllProducts = async (req,res) => {
  try{
    let query = {}
     let sort = '-createdAt'
    let page = 1
    let limit = 6

   if(req.query.title){

    query.name={$regex: `${req.query.title}`, $options: 'i'}

    }
    if(req.query.active){

      if(req.query.active==='active'){
      query.active = true
      }
      if(req.query.active==='inactive'){
              query.active = false
      }

    }
    if(req.query.sort){
        sort = req.query.sort
      }
    if(req.query.page){
      page = parseInt(req.query.page)
    }
     if(req.query.limit){
      limit = parseInt(req.query.limit)
    }

     let skip = (page - 1 ) * limit
console.log("query===",query);
console.log("sort===",sort);

        //  const products = await Product.find(query).sort(sort).limit(limit).skip(skip).exec()
         const products = await Product.find(query).sort(sort).limit(limit).skip(skip).exec()
console.log("products",products);
     const totalResults = await Product.find(query)

    res.status(200).json({success:true,data:products,total:totalResults.length});
  }catch(error){
    console.log(error)
    res.status(500).json({success:false, message:error.mesage})
  }
}

const getProductById= async (req,res) => {
  try{
    const product = await Product.findById(req.params.id);
    res.status(200).json({success:true,data:product});
  }catch(error){
    console.log(error)
    res.status(500).json({success:false,message:error.mesage})
  }
}

module.exports = {
  getAllProducts,
getProductById,
}