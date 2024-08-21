import express from "express";
import { registerUser, loginUser } from "../controller/userController.js";

const router = new express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);

export default router;
