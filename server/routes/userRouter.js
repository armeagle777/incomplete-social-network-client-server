const router = require('express').Router()
const controller = require('../controllers/usersController')
const authMiddleware = require("../middlewares/authMiddleware")
const rolesMiddleware = require("../middlewares/rolesMiddleware")

// Update user
router.put('/:userId',authMiddleware,controller.updateUser)

// Delete user
router.delete('/:userId',rolesMiddleware(['ADMIN']),controller.deleteUser)

//get all friends
router.get('/friends',authMiddleware,controller.getAllFriends)

// Get a user
router.get('/:userId',authMiddleware, controller.getSingleUser)

// Get all users
router.get('/',rolesMiddleware(['ADMIN']), controller.getUsers)

// Follow a user
router.patch('/:id/follow',authMiddleware,controller.followUser)

// Unfollow a user
router.patch('/:id/unfollow',authMiddleware,controller.unfollowUser)



module.exports= router