const { isAuth } = require('../../middlewares/auth')
const { upload } = require('../../middlewares/file')
const {
   getMeme,
   getMemes,
   postMeme,
   deleteMeme,
   getMemesByTag
} = require('../controllers/meme')

const memesRouter = require('express').Router()

memesRouter.get('/tags/:tag', getMemesByTag)
memesRouter.get('/:id', getMeme)
memesRouter.delete('/:id', [isAuth], deleteMeme)
memesRouter.get('/', getMemes)
memesRouter.post('/', [isAuth, upload.single('img')], postMeme)

module.exports = { memesRouter }

// {
//    "title": "catMemeByBar",
//    "img": "catmeme.com",
//    "tags": ["funny", "lol", "cats", "cat"]
// }
