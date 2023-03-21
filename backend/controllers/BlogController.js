const Blog = require('../models/BlogModel')

exports.createblog = async (req, res) => {
    try {
        const blog = new Blog({
            creator_name:req.body.creator_name,
            title:req.body.title,
            content:req.body.content,
            date:req.body.date,
            updated_at:req.body.updated_at
        })

        blog.save().then(
            res.status(200).json({
                msg:"Blog Created Successfully",
                data: blog
            })
        )

    }

    catch (err){
        res.status(500).json({
            msg:"error"
        })
        return
    }
}