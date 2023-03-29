var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth')


/* GET home page. */
router.get('/',auth, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;