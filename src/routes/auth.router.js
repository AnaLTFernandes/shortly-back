import express from "express";
import { signUp } from "../controllers/auth.controller.js";
import signUpValidate from "../middlewares/signupValidate.middleware.js";

const router = express.Router();

router.post("/signup", signUpValidate, signUp);

export default router;
