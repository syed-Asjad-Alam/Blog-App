var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth')
const BlogController = require('../controllers/BlogController')
const CommentController = require('../controllers/CommentController')

//POST routes
router.route('/createBlog').post(
  auth,
  BlogController.createblog
)


//GET routes

router.route('/getBlog/:id').get(
  auth,
  BlogController.getblog
)

router.route('/getAllBlogs').get(
  auth,
  BlogController.getallblogs
)

//Update Routes
router.route('/updateBlog/:id').put(
  auth,
  BlogController.updateblog
)

//Delete Routes
router.route('/deleteBlog/:id').delete(
  auth,
  BlogController.deleteblog,
  CommentController.deleteblogComments
)

module.exports = router;
