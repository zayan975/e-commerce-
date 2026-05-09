const cloudinary = require("cloudinary").v2;
const config = require("./config");

const connectCloudinary = async () => {

    try {
         cloudinary.config({
        cloud_name: config.CLOUDINARY_NAME,
        api_key: config.CLOUDINARY_API_KEY,
        api_secret: config.CLOUDINARY_SECRET_KEY,
    })

    console.log("Cloudinary connected successfully");
    } catch (error) {
        console.error("Error connecting to Cloudinary:", error);
    }
   
}

module.exports = connectCloudinary;