const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
        owner: {
            type: String,
            required: true
        },
        content: {
            type: {
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                },
                image: {
                    type: String,
                    required: false
                },
            },
            required: true
        },
        likes: {
            type: Array,
            default: []
        },
        comments: {
            type:Array,
            default:[]
        }

    },
    {timestamps: true}
)

module.exports = mongoose.model('Post', PostSchema)