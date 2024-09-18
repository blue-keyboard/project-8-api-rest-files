const { isAdmin, isAuth } = require('../../middlewares/auth')
const { upload } = require('../../middlewares/file')
const {
   getUsers,
   getUser,
   register,
   login,
   updateUser,
   deleteUser
} = require('../controllers/user')

const usersRouter = require('express').Router()

usersRouter.get('/:id', getUser)
usersRouter.get('/', [isAdmin], getUsers)
usersRouter.post('/register', [upload.single('profile_pic')], register)
usersRouter.post('/login', login)
usersRouter.put('/:id', [isAuth, upload.single('profile_pic')], updateUser)
usersRouter.delete('/:id', [isAuth], deleteUser)

module.exports = { usersRouter }
