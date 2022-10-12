import express from "express";
import { createUrl, getUrl, openUrl } from "../controllers/urls.controller.js";
import urlValidate from "../middlewares/createUrl.middleware.js";

const router = express.Router();

router.post('/urls/shorten', urlValidate, createUrl);
router.get('/urls/:id', getUrl);
router.get('/urls/open/:shortUrl', openUrl);

export default router;