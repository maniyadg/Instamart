const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.ObjectId, ref: "Users" }],
    latestMessage: {
      type: mongoose.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;