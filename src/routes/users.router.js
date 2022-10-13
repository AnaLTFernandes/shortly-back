import express from "express";
import { getUserData } from "../controllers/users.controller.js";
import validateUser from "../middlewares/users.middleware.js";

const router = express.Router();

router.get('/users/me', validateUser, getUserData);

export default router;