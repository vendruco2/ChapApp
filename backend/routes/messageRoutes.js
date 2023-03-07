const express = require("express");
const {
    allMessages,
    sendMessage,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router(); //create a router

router.route("/:chatId").get(protect, allMessages); //get all messages of a chat
router.route("/").post(protect, sendMessage); //send a message
module.exports = router;