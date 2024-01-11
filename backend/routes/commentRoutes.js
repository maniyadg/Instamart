const express = require('express')
const { createComment, updateComment, likeComment, unLikeComment, deleteComment, getComment } = require('../controllers/commentController')
const { isAuth } = require('../utills/auth')

const router = express.Router()

// create Comment
router.post('/create-comment' , isAuth , createComment)

// get Comment
router.get('/get-comment/:id' , isAuth , getComment)

// update Comment
router.put('/update-comment' , isAuth , updateComment)

// Like Update
router.put('/like-comment/:id' , isAuth , likeComment)

// UnLike Comment
router.put('/unLike-Comment/:id' , isAuth , unLikeComment)

// Delete Comment
router.delete('/delete-Comment' , isAuth , deleteComment)

module.exports = router