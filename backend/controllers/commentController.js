const Comments = require('../models/commentModel')
const Product = require('../models/postModel')

const createComment = async (req, res) => {
    try {
        const { postId, content,   postUserId } = req.body;

        const post = await Product.findById(postId);
        if (!post)
            return res.status(400).json({ message: "This Post does not exist." });


        const newComment = new Comments({
            user: req.user._id, content,   postUserId, postId
        });

        await Product.findOneAndUpdate({ _id: postId }, {
            $push: { comments: newComment._id }
        }, { new: true });

        await newComment.save();

        res.json({
            newComment
        })

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getComment = async (req,res) =>{
    try{
        const post = await Product.findById(req.params.id);
        const comment = await Comments.find({postId: {$eq : post}}).populate('user')
        res.status(200).send({
            success: true,
            message: "Comment Fetched",
            comment,
          });
    }catch(error){
        res.status(500).send({message : 'Internal Server Error'})
    }
}

const updateComment = async (req, res) => {
    try {
        const { content } = req.body;

        const cm = await Comments.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, {
            content
        });

        // if(!cm) 
        //     return res.status(400).json({message: "You can't edit this comment"});

        res.json({ message: "Comment Updated!!" })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const likeComment = async (req, res) => {
    try {
        const comment = await Comments.find({ _id: req.params.id, likes: req.user._id });
        if (comment.length > 0)
            return res.status(400).json({ message: "You already liked this Comment!" })

        await Comments.findOneAndUpdate({ _id: req.params.id }, {
            $push: { likes: req.user._id }
        }, { new: true })

        res.json({
            message: "Comment Liked!",
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const unLikeComment = async (req, res) => {
    try {
        await Comments.findOneAndUpdate({ _id: req.params.id }, {
            $pull: { likes: req.user._id }
        }, { new: true })

        res.json({
            message: "Comment Unliked!"
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteComment = async (req, res) => {
    try {
        const t = await Comments.find({ _id: req.params.id });

        console.log(t);

        const comment = await Comments.findOneAndDelete({
            _id: req.params.id,
            $or: [
                { user: req.user._id },
                { postUserId: req.user._id }
            ]
        })

        await Posts.findOneAndUpdate({ _id: comment.postId }, {
            $pull: { comments: req.params.id }
        })

        res.json({ message: 'Deleted Comment!' })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { createComment, getComment, updateComment, likeComment, unLikeComment, deleteComment }