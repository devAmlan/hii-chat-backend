import express from "express";
import { createChat, fetchChats } from "../controller/chatController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = new express.Router();

router.route("/").post(checkAuth, createChat);
router.route("/").get(checkAuth, fetchChats);

export default router;
