const cloudinary = require('cloudinary').v2
// require("dotenv").config()

try{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    
    })

} catch (error) {
    console.log("error configuring cloudinary", error.message)
}
module.exports = cloudinary;