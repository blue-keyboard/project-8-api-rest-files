const cloudinary = require('cloudinary').v2
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const JESTERLY_STORAGE_NAME = 'Jesterly API REST Files'

const createCloudinaryStorage = (folderName) => {
   return (storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
         folder: folderName,
         allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
      }
   }))
}

const JesterlyStorage = createCloudinaryStorage(JESTERLY_STORAGE_NAME)
const upload = multer({ storage: JesterlyStorage })

module.exports = { upload }
