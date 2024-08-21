import express from "express";
import { sendMessage } from "../controller/messageController.js";
import checkAuth from "../middleware/authMiddleware.js";
import { fetchMessages } from "../controller/messageController.js";

const router = new express.Router();

router.route("/:chatId").get(checkAuth, fetchMessages);
router.route("/").post(checkAuth, sendMessage);

export default router;
