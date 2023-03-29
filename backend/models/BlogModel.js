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
        created_at: {
            type:Date,
            default:new Date()
        },
        updated_at: {
            type:Date,
            default:new Date()
        },
        

    }
    ,
    {
        toJSON: { virtuals: true }, //it is imp when we are doing referencing
        toObject: { virtuals: true },
    }
)

BlogSchema.virtual("Comment", {
    ref:"Comment",
    foreignField:"refOfBlog",
    localField:"_id"
  })

const blog = mongoose.model("Blog",BlogSchema)
module.exports = blog