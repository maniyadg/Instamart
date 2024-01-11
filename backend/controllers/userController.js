const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utills/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const sendToken = require('../utills/jwt')
const ls = require('localstorage-slim')
const nodemailer = require("nodemailer")

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let avatar;

        let BASE_URL = process.env.BACKEND_URL;
        if(process.env.NODE_ENV === "production"){
            BASE_URL = `${req.protocol}://${req.get('host')}`
        }

        if (req.file) {
            avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
        }



        // Vallidations
        if (!username) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ error: "E-Mail is Required" });
        }

        if (!password) {
            return res.send({ error: "Password is Required" });
        }

        // Check Extisting User

        const extistingUser = await userModel.findOne({ email })

        if (extistingUser) {
            return res.status(200).send({
                success: false,
                message: "User Already Exists"
            })
        }

        // if user not exists to register and save DB
        // To hash the password

        const hassedPassword = await bcrypt.hash(password, 10)

        const user = await new userModel({
            username,
            email,
            password: hassedPassword,
            avatar
        }).save()


        res.status(201).send({
            success: true,
            message: "user registered successfully",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}

// Login Controller
const login = catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body

        // vallidation
        if (!email || !password) {
            return next(new ErrorHandler('Please enter email & password', 400))
        }

        // Check User
        const user = await userModel.findOne({ email })

        if (!user) {
            // If user is Not register
            return next(new ErrorHandler('Invalid email or password', 401))
        } else {
            // Password Comparission
            const comparePass = await bcrypt.compare(password, user.password)

            // If Password is Error
            if (!comparePass) {
                return next(new ErrorHandler('Invalid email or password', 401))
            }
            sendToken(user, 201, req, res)


        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
})

// Update User
const updateUser = async(req,res) => {
    try {
        const { username, email, phone } = req.body;

        let avatar;
        let BASE_URL = process.env.BACKEND_URL;
        if(process.env.NODE_ENV === "production"){
            BASE_URL = `${req.protocol}://${req.get('host')}`
        }
        if(req.file){
            avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
        }

        // Vallidations
        if (!username) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ error: "E-Mail is Required" });
        }




        // if user not exists to register and save DB
        // To hash the password


        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            {   ...req.body , avatar },
            { new: true }
          );

        res.status(201).send({
            success: true,
            message: "user Details Updated successfully",
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}

// get All User
const getAllUser = async (req, res) => {
    try {
        const user = await userModel.find({ _id: { $ne: req.user._id } })
        if (user) {
            res.status(200).send({
                success: true,
                message: "User get Successfully",
                user
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

// get single user
const singelUser = catchAsyncError(async (req, res, next) => {
    try {
        const user = req.user
        if (user) {
            res.status(200).send({ user, success: true });
        }



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "User Not Found",
        });
    }
})

// search User
const searchUser = async (req, res) => {
    try {
        const { keyword } = req.params;
        const user = await userModel
            .find({
                $or: [
                    { username: { $regex: keyword, $options: "i" } },
                    { email: { $regex: keyword, $options: "i" } },
                ],
            })
        res.status(200).send({
            success: true,
            counTotal: user.length,
            message: "Search Users ",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Users API",
            error,
        });
    }
};

//Logout 
const logoutUser = (req, res, next) => {

    ls.remove("token")

    res.status(200)
        .json({
            success: true,
            message: "Loggedout"
        })
}

// Follow user
const followUser = async (req, res, next) => {
    try {
        const user = await userModel.find({ _id: req.params.id, followers: req.user._id })
        if (user.length > 0) return res.status(500).json({ msg: "You followed this user." })

        const newUser = await userModel.findOneAndUpdate({ _id: req.params.id }, {
            $push: { followers: req.user._id }
        }, { new: true }).populate("followers following")

        const followinguser = await userModel.findOneAndUpdate({ _id: req.user._id }, {
            $push: { following: req.params.id }
        }, { new: true })

        res.json({ newUser, followinguser })
    } catch (error) {
        console.log(error)
    }
};

// UnFoloe User
const unfollowUser = async (req, res) => {
    try {
        const newUser = await userModel.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { followers: req.user._id }
        }, { new: true }).populate("followers following")

        const user = await userModel.findOneAndUpdate({ _id: req.user._id }, {
            $pull: { following: req.params.id }
        }, { new: true })

        res.json({ newUser, user })

    } catch (error) {
        console.log(error)
    }
}

// Forget Password ( link is sent to gmail)
const forgotPassword = async (req, res) => {
    try {
        const email = req.body;

        const user = await userModel.findOne( email )
        console.log(user)
        if (!user) {
            res.json({ message: "User doesn't exist" });
        }
        const secret = user.password + process.env.secret_key;
        const token = jwt.sign({ _id: user._id, email: user.email }, secret, {
            expiresIn: "5m",
        });
        console.log(token)

        let BASE_URL = process.env.FRONTEND_URL;
        if(process.env.NODE_ENV === "production"){
            BASE_URL = `${req.protocol}://${req.get('host')}`
        }
        
        const link = `${BASE_URL}/reset-password/${user._id}/${token}`;
        console.log(link);

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
            },
        });

        // send mail with defined transport object
        let details = {
            from: process.env.USER, // sender address
            to: user.email, // list of receivers
            subject: "Reset-Password", // Subject line
            text: link,
        };

        transporter.sendMail(details, (err) => {
            if (err) {
                console.log("error", err);
            } else {
                console.log("email sent");
            }
        });
        res.json(link)
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}

// Reset-Password
const resetPassword = async(req,res) => {
    const {  token } = req.params;
    const { password } = req.body;
  try {
    const userdata = await userModel.findOne({ _id: req.params.id })

    if (!userdata) {
      res.json({ message: "User doesn't exist" });
    }
    const secret = userdata.password + process.env.secret_key;
    const verify = jwt.verify(token, secret);
    const confirnPassword = await bcrypt.hash(password, 10);
    const user = await userModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $set: {
            password: confirnPassword,
        },
      }
    );
    res.send({ email: verify.email, status: "verified",user });
  } catch (error) {
    console.log(error)
    res.json({ status: "Something Went Wrong" });
  }
}

module.exports = { register, login, singelUser, searchUser, forgotPassword, getAllUser, logoutUser, followUser, unfollowUser , resetPassword , updateUser}