const express = require ('express');
const { allMessages, sendMessage } = require("../controllers/messageController");
const { isAuth } = require("../utills/auth");

const router = express.Router();



router.get("/:chatId" , isAuth, allMessages);
router.post("/" , isAuth, sendMessage);

module.exports = router;

