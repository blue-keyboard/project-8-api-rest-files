const cloudinary = require('cloudinary').v2

const deleteFile = (url) => {
   const public_id = url
      .split('/') // [ 'https:', '', 'res.cloudinary.com', ... ]
      .slice(-2) // [ 'Jesterly%20API%20REST%20Files', 'oucx3hwklslz6uu5vlkr.jpg' ]
      .join('/') // Jesterly%20API%20REST%20Files/oucx3hwklslz6uu5vlkr.jpg
      .replace(/%20/g, ' ') // Jesterly API REST Files/oucx3hwklslz6uu5vlkr.jpg
      .split('.')[0] // Jesterly API REST Files/oucx3hwklslz6uu5vlkr

   cloudinary.uploader.destroy(public_id)
}

module.exports = { deleteFile }
