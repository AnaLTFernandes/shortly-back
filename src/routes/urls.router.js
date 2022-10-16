import express from "express";
import { createUrl, getUrls, getUrl, openUrl, deleteUrl } from "../controllers/urls.controller.js";
import urlValidate from "../middlewares/createUrl.middleware.js";
import deleteValidate from "../middlewares/deleteUrl.middleware.js";

const router = express.Router();

router.post('/urls/shorten', urlValidate, createUrl);

router.get('/urls', getUrls);
router.get('/urls/:id', getUrl);
router.get('/urls/open/:shortUrl', openUrl);

router.delete('/urls/:id', deleteValidate, deleteUrl);

export default router;
