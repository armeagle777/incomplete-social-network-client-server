const User = require('../models/User')
const bcrypt = require("bcryptjs");

class usersController {

    async updateUser(req, res) {
        try {
            const currentUserId = req.user.id
            if (currentUserId !== req.params.userId) {
                return res.status(403).json({message: 'You can only update your profile data'})
            }
            if (req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, 7)
            }
            const {followings, username, roles: userRoles, followers, _id, ...updateInfo} = req.body
            await User.findByIdAndUpdate(currentUserId, {$set: updateInfo})
            const user = await User.findById(currentUserId)
            const {password, roles, ...userInfo} = user._doc
            return res.status(200).send(userInfo)
        } catch (err) {
            console.log(err)
            return res.status(403).json({message: "Something went wrong"})
        }
    }

    async deleteUser(req, res) {
        try {
            await User.deleteOne({_id: req.params.userId})
            return res.status(200).json({message: 'User deleted successfully'})
        } catch (err) {
            console.log(err)
            return res.status(403).json({message: "Something went wrong"})
        }
    }

    async followUser(req, res) {
        const currentUserId = req.user.id
        const followUserId = req.params.id

        if (currentUserId === followUserId) {
            return res.status(403).json({message: "You can not follow yourself"})
        }
        try {
            const followUser = await User.findById(followUserId)
            const currentUser = await User.findById(currentUserId)
            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({$push: {followers: currentUserId}})
                await currentUser.updateOne({$push: {followings: followUserId}})
                return res.status(200).json({message: 'User has been followed'})
            } else {
                return res.status(403).json({message: 'You already follow this user'})
            }

        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    }

    async unfollowUser(req, res) {
        const currentUserId = req.user.id
        const unfollowUserId = req.params.id

        if (currentUserId === unfollowUserId) {
            return res.status(403).json({message: "You can not unfollow yourself"})
        }
        try {
            const unfollowUser = await User.findById(unfollowUserId)
            const currentUser = await User.findById(currentUserId)
            if (unfollowUser.followers.includes(currentUserId)) {
                await unfollowUser.updateOne({$pull: {followers: currentUserId}})
                await currentUser.updateOne({$pull: {followings: unfollowUserId}})
                return res.status(200).json({message: 'User has been unfollowed'})
            } else {
                return res.status(403).json({message: 'You don\'t follow this user'})
            }
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            return res.status(200).json({users})
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Something went wrong"})
        }
    }

    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.userId)
            const {password, roles, updatedAt, ...userInfo} = user._doc
            return res.status(200).json(userInfo)
        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Something went wrong"})
        }
    }

    async getAllFriends(req, res) {
        try {
            const currentUserId = req.user.id
            const currentUser = await User.findById(currentUserId)
            const friends = await Promise.all(
                currentUser.followings.map(friendId => User.findById(friendId))
            )
            const friendList = friends.map(friend => {
                const {_id,username,profilePicture} = friend
               return {id:_id,username,profilePicture}
            })
            return res.status(200).send(friendList)

        } catch (err) {
            console.log(err)
            return res.status(500).json({message: "Something went wrong"})
        }
    }
}

module.exports = new usersController()