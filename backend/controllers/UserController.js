const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//for creating a User
exports.createuser = async (req, res) => {
    try {

        const {firstName, lastName, email, password} = req.body
        if (!(firstName && lastName && email && password)) {
           return res.status(400).send("All input is required")
        }

        // const oldUser = User.findOne({email})

        // if (oldUser) {
        //     return res.status(400).send("User Already exists")
        // }

        encryptedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            firstName:firstName,
            lastName:lastName,
            email:email.toLowerCase(),
            password:encryptedPassword,
            createdAt:req.body.createdAt,
            updatedAt:req.body.updatedAt
        })

        const token = jwt.sign(
            { user_id: user._id,email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          // save user token
        //   user.token = token;
        //   return res.status(201).json(user);

        user.save().then(
            res.status(200).json({
                msg:"User Created Successfully",
                data: user
            })
        )

    }

    catch (err){
        console.log(err)
        res.status(500).json({
            msg:"error"
        })
        return
    }
}

//for logging in
exports.login = async (req, res) => {
    try {

        const {email, password} = req.body
        if (!(email && password)) {
           return res.status(400).send("All input is required")
        }

        const user = await User.findOne({email})
    

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id,email },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );

            user.token = token

            return res.status(200).json(user);
        }

        return res.status(400).send("Invalid Credentials")

    }

    catch (err){
        console.log(err)
        res.status(500).json({
            msg:"error"
        })
        return
    }
}


//for getting a single user
exports.getuser = async (req, res) => {
    try {
        const user = await User.findOne({_id:req.params.id})
        res.status(200).json({
            status:"Success",
            data: user
            })
 
    }

    catch (err){
        res.status(500).json({
            msg:"error"
        })
        return
    }
}
//for getting all users
exports.getallusers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({
            status:"Success",
            items:users.length,
            data: users
            })
 
    }

    catch (err){
        res.status(500).json({
            msg:"error"
        })
        return
    }
}
//for updating a user
exports.updateuser = async (req, res) => {
    try {
        const user = await Blog.findByIdAndUpdate({_id:req.params.id},{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            createdAt:req.body.createdAt,
            updatedAt:Date.now()
        })
        res.status(200).json({
            status:"Updated Successfully",
            data: user
            })
 
    }

    catch (err){
        res.status(500).json({
            msg:"error"
        })
        return
    }
}
//for deleting a user
exports.deleteuser = async (req, res) => {
    try {
        const user = await User.deleteOne({_id:req.params.id})
        res.status(200).json({
            status:"Deleted Successfully",
            data: user
            })
 
    }

    catch (err){
        res.status(500).json({
            msg:"error"
        })
        return
    }
}