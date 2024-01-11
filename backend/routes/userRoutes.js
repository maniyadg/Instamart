const express = require('express')

const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/user' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })

const { register, login, forgotPassword, singelUser, getAllUser, logoutUser, searchUser ,followUser, unfollowUser, resetPassword, updateUser } = require('../controllers/userController')
const {isAuth } = require('../utills/auth') 

const router = express.Router()

// Register Route
router.post ('/register' , upload.single('avatar') , register )

// Login Route
router.post('/login' , login)

// update User
router.put('/updateUser' , isAuth , upload.single('avatar') , updateUser)

// get all user
router.get('/getalluser', isAuth , getAllUser)

// Get Single User Route
router.get('/singleuser' ,isAuth, singelUser)

//search users
router.get("/get-users/:keyword", searchUser);

// logout
router.get('/logedout' , logoutUser)

// Forget Password
  router.post("/forgot-password", forgotPassword);

// Reset Password
router.put("/reset-password/:id/:token", resetPassword);

// follow || unfollow user
router.put("/follow/:id" , isAuth, followUser);

// unfollow user
router.put("/unfollow/:id" , isAuth, unfollowUser);

//protected user route auth
router.get("/user-auth", isAuth, (req, res) => {
    res.status(200).send( req.user);
  });

module.exports = router