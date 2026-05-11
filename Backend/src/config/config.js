const dotenv = require("dotenv");

dotenv.config();

if(!process.env.MONGO_URI) {
    throw new Error("Mongo uri is not available")
}

if(!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT secret key is not available")
}

if(!process.env.CLOUDINARY_API_KEY) {
    throw new Error("Cloudinary API key is not available")
}

if(!process.env.CLOUDINARY_SECRET_KEY) {
    throw new Error("Cloudinary secret key is not available")
}

if(!process.env.CLOUDINARY_NAME) {
    throw new Error("Cloudinary name is not available")
}

if(!process.env.ADMIN_EMAIL) {
    throw new Error("Admin email is not available")
}

if(!process.env.ADMIN_PASSWORD) {
    throw new Error("Admin password is not available")
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
}

module.exports = config;