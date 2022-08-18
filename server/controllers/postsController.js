const Post = require("../models/Post");
const User = require("../models/User");
const {validationResult} = require("express-validator");

class postsController {
    async getSinglePost(req, res) {
        try {
            const postId = req.params.postId
            const singlePost = await Post.findById(postId)
            res.send(singlePost)
        } catch (err) {
            res.json({message: 'No post found with such Id'})
        }
    }

    async getAllPosts(req, res) {
        try {
            const pageNumber = req.query._page || 1
            const limit = req.query._limit || 20
            const offset = pageNumber * limit - limit
            const posts = await Post.find({owner: req.user.id}).skip(offset).limit(limit)
            res.send(posts)
        } catch (err) {
            return res.json({message: 'Try later...'})
        }
    }

    async getTimelinePosts(req, res) {
        try{
            const pageNumber = req.query._page || 1
            const limit = req.query._limit || 20
            const offset = pageNumber * limit - limit
            const currentUser = await User.findById(req.user.id)
            console.log(currentUser)
            const friendPosts = await Promise.all(
                currentUser.followings.map(friendId =>{
                    return Post.find({owner:friendId}).skip(offset).limit(limit)
                })
            )
            res.json({timeline: friendPosts})
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async createPost(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessages = []
            const {errors: errorsObj} = errors
            for (let errorobject of errorsObj) {
                errorMessages.push(errorobject.msg)
            }
            return res.status(400).json({message: errorMessages})
        }
        try {
            const {content_title, content_description, content_image_url} = req.body
            const post = await new Post({
                owner: req.user.id,
                content: {
                    title: content_title,
                    description: content_description,
                    image: content_image_url
                },
            })
            const addedPOst = await post.save()
            res.send(addedPOst)
        } catch (err) {
            return res.json({message: 'Check sent data and try again'})
        }


    }

    async updatePost(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorMessages = []
            const {errors: errorsObj} = errors
            for (let errorobject of errorsObj) {
                errorMessages.push(errorobject.msg)
            }
            return res.status(400).json({message: errorMessages})
        }
        try {
            const post = await Post.findById(req.params.postId)
            if (post.owner !== req.user.id) {
                return res.status(403).json({message: 'You can not edit other user\'s post'})
            }
            await post.updateOne({
                $set: {
                    content: {
                        title: req.body.content_title,
                        description: req.body.content_description
                    }
                }
            })
            return res.status(200).json({message: 'Post successfully updated'})

        } catch (err) {
            res.json(err)
        }
    }

    async deletePost(req, res) {
        try {
            const post = await Post.findById(req.params.postId)
            if (post.owner !== req.user.id) {
                return res.status(403).json({message: 'You can not delete other user\'s post'})
            }
            await post.deleteOne()
            return res.status(200).json({message: 'Post successfully deleted'})

        } catch (err) {
            res.json(err)
        }
    }

    async likePost(req, res) {
        try {
            const post = await Post.findById(req.params.postId)
            if (!post.likes.includes(req.user.id)) {
                await post.updateOne({$push: {likes: req.user.id}})
                res.status(200).json({message: 'Successfully liked'})
            }else{
                await post.updateOne({$pull: {likes: req.user.id}})
                res.status(200).json({message: 'Successfully unliked'})
            }

        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = new postsController()