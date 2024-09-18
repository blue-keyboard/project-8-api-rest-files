const mongoose = require('mongoose')
const DEFAULT_MEMELIST_IMG =
   'https://res.cloudinary.com/dveawmfmi/image/upload/v1726669664/Jesterly%20API%20REST%20Files/xq0r1sva9yh9uxwxvtji.webp'

const memelistSchema = new mongoose.Schema(
   {
      title: { type: String, required: true },
      description: { type: String },
      img: { type: String, required: true, default: DEFAULT_MEMELIST_IMG },
      memes: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'memes'
         }
      ],
      uploader: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'users',
         required: true
      }
   },
   {
      timestamps: true,
      collection: 'memelists'
   }
)

const Memelist = mongoose.model('memelists', memelistSchema, 'memelists')

module.exports = { Memelist, DEFAULT_MEMELIST_IMG }
