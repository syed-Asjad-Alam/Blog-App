const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema(
    {
        creator_name: {
            type:String
        },
        title: {
            type:String
        },
        content: {
            type:String
        },
        date: {
            type:Date,
            default:Date.now()
        },
        updated_at: {
            type:Date,
            default:Date.now()
        },

    }
)

const blog = mongoose.model("Blog",BlogSchema)
module.exports = blog