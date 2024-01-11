const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    tag: Object,
    reply: mongoose.ObjectId,
    likes: [{type: mongoose.ObjectId, ref: 'Users'}],
    user: {type: mongoose.ObjectId, ref: 'Users'},
    postId: mongoose.ObjectId,
    postUserId: mongoose.ObjectId
},{
    timestamps: true
});

module.exports = mongoose.model('comment', commentSchema);