var express = require('express');
var router = express.Router();

const BlogController = require('../controllers/BlogController')

//POST routes
router.route('/createBlog').post(
  BlogController.createblog
)


//GET routes

router.route('/getBlog/:id').get(
  BlogController.getblog
)

router.route('/getAllBlogs').get(
  BlogController.getallblogs
)

//Update Routes
router.route('/updateBlog/:id').put(
  BlogController.updateblog
)

//Delete Routes
router.route('/deleteBlog/:id').delete(
  BlogController.deleteblog
)

module.exports = router;
