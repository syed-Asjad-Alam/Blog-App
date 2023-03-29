const Comment = require('../models/CommentModel')


//for posting a comment on a blog
exports.postcomment = async(req,res) => {
    try {
        const comment = await Comment.create(req.body)

        res.status(201).json({
            status: "success",
      
            data: {
              comment,
            },
          });

    }
    catch(err) {
        console.log(err);
        res.status(404).json({
        status: "fail",
        message: err.message,
    });
    }
}


// //for getting all the comments of a blog
// exports.getAllblogComments = async(req,res, next) => {
//     try {
//         const AllComments = await Comment.find({refOfBlog: req.params.id})
//         res.status(200).json({
//             status:"success",
//             result:AllComments.length,
//             data: AllComments
//         })
  
//     }
//     catch (err) {
//         return res.status(404).json({
//             status:"Failed",
//             message: err.message
//         })
  
//     }
//   }

//for deleting all the comments of a blog
exports.deleteblogComments = async(req, res, next) => {
      try {
        const deletedComments = await Comment.deleteMany({
          refOfBlog: req.params.id,
        });
        console.log(deletedComments);
        res.status(200).json({
          status: "success",
        });
      } catch (err) {
        return res.status(404).json({
          status: "fail",
          message: err.message,
        });
      }
    };
//for updating a comment
exports.updatecomment = async (req, res) => {
        try {
            const comment = await Comment.findByIdAndUpdate({_id:req.params.id},{
                comment:req.body.comment,
                created_at:req.body.created_at,
                updated_at:Date.now()
            })
            res.status(200).json({
                status:"Updated Successfully",
                data: comment
                })
     
        }
    
        catch (err){
            console.log(err)
            res.status(500).json({
                msg:"error"
            })
            return
        }
    }
//for deleting a comment
exports.deletecomment = async (req, res) => {
        try {
            const comment = await Comment.deleteOne({_id:req.params.id})
            res.status(200).json({
                status:"Deleted Successfully",
                data: comment
                })
     
        }
    
        catch (err){
            res.status(500).json({
                msg:"error"
            })
            return
        }
    }
    