const cloudinary = require('cloudinary').v2

const connectCloudinary = () => {
   try {
      cloudinary.config({
         cloud_name: process.env.CLOUD_NAME,
         api_key: process.env.API_KEY,
         api_secret: process.env.API_SECRET
      })

      console.log('Cloudinary connection success')
   } catch (error) {
      console.log('error connecting to cloudinary')
      console.log(message.error)
   }
}

module.exports = { connectCloudinary }
