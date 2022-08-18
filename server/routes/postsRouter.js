const router = require('express').Router()
const {check} = require('express-validator')
const Post = require('../models/Post')
const postsController = require('../controllers/postsController')
const authMiddleware = require('../middlewares/authMiddleware')



//Get user's all posts by _page AND _limit
router.get('/',authMiddleware,postsController.getAllPosts)

//Get timeline  posts by _page AND _limit
router.get('/timeline',authMiddleware,postsController.getTimelinePosts)

//Get a specific post
router.get('/:postId',authMiddleware, postsController.getSinglePost)

//Submit a post
router.post('/',[
    authMiddleware,
    check('content_title','Post title can not be empty').notEmpty(),
    check('content_description','Post description must contain from 1 to 500 characters').isLength({min:1,max:500})
], postsController.createPost)

//Update a post
router.patch('/:postId', [
    authMiddleware,
    check('content_title','Post title can not be empty').notEmpty(),
    check('content_description','Post description must contain from 1 to 500 characters').isLength({min:1,max:500})
], postsController.updatePost)

//Delete  a post
router.delete('/:postId',authMiddleware, postsController.deletePost)

//Like a post
router.patch('/:postId/like',authMiddleware, postsController.likePost)



module.exports = router

