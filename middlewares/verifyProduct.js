

const checkCategoryExist = async (req,res,next) =>{

  try{
 


  next()
  }catch(err){
    console.log(err)

    res.status(500).json({ success:false , message: "Something went wrong, category existens verification fail" });
  }

}


module.exports = checkCategoryExist
