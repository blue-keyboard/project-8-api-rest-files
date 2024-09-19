const { deleteFile } = require('../../utils/deleteFile')
const { generateSign } = require('../../utils/jwt')
const { Memelist } = require('../models/memelist')
const { User, DEFAULT_PROFILE_PIC } = require('../models/user')
const bcrypt = require('bcrypt')

const populateQuery = [
   { path: 'memes', select: ['_id', 'title'] },
   { path: 'memelists', select: ['_id', 'title'] }
]

// Admin role
const getUsers = async (req, res, next) => {
   try {
      const users = await User.find().populate(populateQuery)
      return res.status(200).json(users)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

// Everyone
const getUser = async (req, res, next) => {
   try {
      const user = await User.findById(req.params.id).populate(populateQuery)

      return res.status(200).json(user)
   } catch (error) {
      return res.status(404).json(error.message)
   }
}

// Everyone
const register = async (req, res, next) => {
   try {
      const user = new User({
         username: req.body.username,
         email: req.body.email,
         password: req.body.password,
         role: 'user'
      })

      const usernameDuplicated = await User.findOne({
         username: user.username
      })
      const emailDuplicated = await User.findOne({ email: user.email })
      if (emailDuplicated) {
         return res.status(400).json('email already exists')
      }
      if (usernameDuplicated) {
         return res.status(400).json('username already exists')
      }

      const userSaved = await user.save()

      return res.status(201).json(userSaved)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

// Everyone
const login = async (req, res, next) => {
   try {
      const user = await User.findOne({ username: req.body.username })

      if (!user) {
         return res.status(404).json('Username not found')
      }
      if (bcrypt.compareSync(req.body.password, user.password)) {
         const token = generateSign(user._id)
         return res.status(200).json({ user, token })
      } else {
         return res.status(400).json('Incorrect password')
      }
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

// admin role, same user
const updateUser = async (req, res, next) => {
   try {
      const userIsAdmin = req.user.role === 'admin'

      if (!userIsAdmin && req.user.id !== req.params.id) {
         return res
            .status(400)
            .json('You are not authorized to perform this action')
      }

      if (!userIsAdmin && req.body.role !== 'user') {
         req.body.role = 'user'
      }

      if (req.file) {
         req.body.profile_pic = req.file.path
      }

      const userUpdated = await User.findByIdAndUpdate(
         req.params.id,
         req.body,
         {
            new: true,
            runValidators: true
         }
      )

      if (
         req.user.profile_pic !== userUpdated.profile_pic &&
         req.user.profile_pic !== DEFAULT_PROFILE_PIC
      ) {
         deleteFile(req.user.profile_pic)
      }

      return res.status(200).json(userUpdated)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

// admin role, same user
const deleteUser = async (req, res, next) => {
   try {
      if (!req.user._id.equals(req.params.id) && !req.user.role === 'admin') {
         console.log(req.user)
         return res
            .status(400)
            .json("You don't have permissions to perform this action")
      }

      const userDeleted = await User.findByIdAndDelete(req.params.id)

      if (userDeleted.profile_pic !== DEFAULT_PROFILE_PIC) {
         deleteFile(userDeleted.profile_pic)
      }

      return res.status(200).json(userDeleted)
   } catch (error) {
      return res.status(400).json(error.message)
   }
}

module.exports = { getUsers, getUser, register, login, updateUser, deleteUser }
