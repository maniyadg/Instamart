const express = require("express");
const { createProduct , getProduct, productCategory, productuser , searchProduct, getSingleProduct, getPosts, likePost, unLikePost } = require("../controllers/postController");
const { isAuth } = require("../utills/auth");
const multer = require('multer');
const path = require('path')

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/product' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })

const router = express.Router()

// Create Product

router.post('/create-product' , isAuth ,upload.array('images'), createProduct)

// get Posts
router.get('/myposts' , isAuth , getPosts)

//get products
router.get("/get-products", isAuth ,getProduct);

//get single products
router.get("/get-product/:id", getSingleProduct);

//category wise product
router.get("/product-category/:name", productCategory);

//search product
router.get("/get-products/:keyword", searchProduct);

//user wise product
router.get("/product-user/:name", productuser);

// Like Post
router.put('/like/:id' , isAuth , likePost)

// UnLike Post
router.put('/unLike/:id' , isAuth , unLikePost)

module.exports = router