
const express = require("express");
const {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    removeFromGroup,
    addToGroup,

} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware"); // Import the protect middleware

const router = express.Router();

router.route("/").post(protect, accessChat); // ceate a new chat
router.route("/").get(protect, fetchChats); // Get all chats
router.route("/group").post(protect, createGroupChat); // Create a new group chat
router.route("/rename").put(protect, renameGroup); // Rename a group chat
router.route("/groupremove").put(protect, removeFromGroup); // Remove a user from a group chat
router.route("/groupadd").put(protect, addToGroup); // Add a user to a group chat

module.exports = router; // Export the router