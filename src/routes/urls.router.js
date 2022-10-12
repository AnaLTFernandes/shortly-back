import express from "express";
import { createUrl } from "../controllers/urls.controller.js";
import urlValidate from "../middlewares/createUrl.middleware.js";

const router = express.Router();

router.post('/urls/shorten', urlValidate, createUrl);

export default router;