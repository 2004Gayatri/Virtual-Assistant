const cloudinary = require('cloudinary');
import fs from "fs"
const cloudinary = require('cloudinary').v2;
import { v2 as cloudinary } from 'cloudinary'
const uploadOnCloudinary = async (filePath) =>{
  cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});
try{
  const uploadResult = await cloudinary.uploader 
.upload(filePath);
fs.unlinkSync(filePath);
return uploadResult.secure_url;
}catch(error){
  fs.unlinkSync(filePath);
  return res.status(500).json({message:"cloudinary error"});
}

}

export default uploadOnCloudinary;

// //'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',{
//     public_id : 'shoes',
//   }