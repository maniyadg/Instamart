const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
       type: mongoose.ObjectId,
        ref: "Users" 
      },
    content: {
       type: String,
        trim: true
       },
    chat: { 
      type: mongoose.ObjectId,
       ref: "Chat" 
      },
    readBy: [{
       type: mongoose.ObjectId,
        ref: "Users" 
      }],
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;