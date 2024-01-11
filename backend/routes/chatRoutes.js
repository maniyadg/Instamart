const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatController");
const { isAuth } = require("../utills/auth");

const router = express.Router();

router.post("/" , isAuth, accessChat);
router.get("/" , isAuth, fetchChats);
router.post("/group" , isAuth, createGroupChat);
router.put("/rename" , isAuth, renameGroup);
router.put("/groupremove" , isAuth, removeFromGroup);
router.put("/groupadd" , isAuth, addToGroup);

module.exports = router;