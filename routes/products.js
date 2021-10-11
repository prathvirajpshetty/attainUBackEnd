
const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const { getAllProducts,getProductById} =require(
  '../controllers/productsControllers')
  const {verifyToken } =require('../middlewares/authJwt')

const  checkCategoryExist= require('../middlewares/verifyProduct');
//multer config
const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'./storage/media')
  },

  filename: function(req,file,cb){
    cb(null,  Date.now()+path.extname(file.originalname))
  },

  
});
const filefilter = (req,file,cb) =>{
  if(!file){
    cb(null,false)
  }else{
    cb(null,true)
  }
}
const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
  fileFilter: filefilter
});



router.get('/', getAllProducts);

module.exports = router