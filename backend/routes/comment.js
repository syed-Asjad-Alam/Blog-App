var express = require('express');
var router = express.Router();

const CommentController = require('../controllers/CommentController')

//POST Routes
router.route('/postComment').post(
    CommentController.postcomment
)

// //Get Routes
// router.route('/getBlogComments').get(
//     CommentController.getAllblogComments
// )


//Update Routes
router.route('/updateComment/:id').put(
    CommentController.updatecomment
)

//Delete Routes
router.route('/deleteComment/:id').delete(
    CommentController.deletecomment
)


module.exports = router;