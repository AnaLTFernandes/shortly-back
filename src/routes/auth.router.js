import express from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import signInValidate from "../middlewares/signinValidate.middleware.js";
import signUpValidate from "../middlewares/signupValidate.middleware.js";

const router = express.Router();

router.post("/signup", signUpValidate, signUp);
router.post("/signin", signInValidate, signIn);

export default router;
