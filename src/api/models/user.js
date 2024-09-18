const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const DEFAULT_PROFILE_PIC =
   'https://res.cloudinary.com/dveawmfmi/image/upload/v1726656576/jesterly_default_profile_pic_uzfwj6.jpg'

const userSchema = new mongoose.Schema(
   {
      username: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      profile_pic: {
         type: String,
         required: true,
         default: DEFAULT_PROFILE_PIC
      },
      role: {
         type: String,
         required: true,
         enum: ['user', 'admin'],
         default: 'user'
      },
      memes: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'memes'
         }
      ],
      memelists: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'memelists'
         }
      ]
   },
   {
      timestamps: true,
      collection: 'users'
   }
)

userSchema.pre('save', function () {
   this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('users', userSchema, 'users')

module.exports = { User, DEFAULT_PROFILE_PIC }
