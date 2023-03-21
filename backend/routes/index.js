var express = require('express');
var router = express.Router();

const BlogController = require('../controllers/BlogController')


router.route('/createBlog').post(
  BlogController.createblog
)

module.exports = router;
