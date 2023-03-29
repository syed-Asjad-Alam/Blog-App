var express = require('express');
var router = express.Router();

const UserController = require('../controllers/UserController')

//POST Routes
router.route('/createUser').post(
  UserController.createuser
)

router.route('/login').post(
  UserController.login
)

//GET Routes
router.route('/getAllUsers').get(
  UserController.getallusers
)

router.route('/getSingleUser/:id').get(
  UserController.getuser
)

//Update Routes
router.route('/updateUser/:id').put(
  UserController.updateuser
)

//Delete Routes
router.route('/deleteUser/:id').delete(
  UserController.deleteuser
)


module.exports = router;
