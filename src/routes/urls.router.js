import express from "express";
import { createUrl, getUrl } from "../controllers/urls.controller.js";
import urlValidate from "../middlewares/createUrl.middleware.js";

const router = express.Router();

router.post('/urls/shorten', urlValidate, createUrl);
router.get('/urls/:id', getUrl);

export default router;