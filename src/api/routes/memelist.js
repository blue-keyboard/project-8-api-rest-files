const { isAuth } = require('../../middlewares/auth')
const { upload } = require('../../middlewares/file')
const {
   getMemelist,
   getMemelists,
   postMemelist,
   updateMemelist,
   deleteMemelist
} = require('../controllers/memelist')

const memelistsRouter = require('express').Router()

memelistsRouter.get('/:id', getMemelist)
memelistsRouter.put('/:id', [isAuth, upload.single('img')], updateMemelist)
memelistsRouter.delete('/:id', [isAuth], deleteMemelist)
memelistsRouter.get('/', getMemelists)
memelistsRouter.post('/', [isAuth, upload.single('img')], postMemelist)

module.exports = { memelistsRouter }
