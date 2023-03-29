const Blog = require('../models/BlogModel')



//for creating a blog
exports.createblog = async (req, res) => {
    try {
        const blog = new Blog({
            creator_name:req.body.creator_name,
            title:req.body.title,
            content:req.body.content,
            created_at:req.body.created_at,
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

//for getting a single blog
exports.getblog = async (req, res) => {
    try {
        const blog = await Blog.findOne({_id:req.params.id}).populate({path:"Comment"})
        res.status(200).json({
            status:"Success",
            data: blog
            })
 
    }

    catch (err){
        res.status(500).json({
            msg:"error"
        })
        return
    }
}
//for getting all blogs
exports.getallblogs = async (req, res) => {
    try {
        const blog = await Blog.find()
        res.status(200).json({
            status:"Success",
            items:blog.length,
            data: blog
            })
 
    }

    catch (err){
        res.status(500).json({
            msg:"error"
        })
        return
    }
}
//for updating a blog
exports.updateblog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate({_id:req.params.id},{
            creator_name:req.body.creator_name,
            title:req.body.title,
            content:req.body.content,
            created_at:req.body.created_at,
            updated_at:Date.now()
        })
        res.status(200).json({
            status:"Updated Successfully",
            data: blog
            })
 
    }

    catch (err){
        res.status(500).json({
            msg:"error"
        })
        return
    }
}
//for deleting a blog
exports.deleteblog = async (req, res, next) => {
    try {
        const blog = await Blog.deleteOne({_id:req.params.id})
        next() 
    }

    catch (err){
        res.status(500).json({
            msg:"error"
        })
        return
    }
}
