import { nanoid } from "nanoid";
import { STATUS_CODE } from "../enums/statusCode.js";
import * as repository from "../repositories/urls.reporitory.js";
import * as responseHelper from "../helpers/response.helper.js";

async function createUrl(req, res) {
	const { url, user } = res.locals;

	let shortUrl;
	let hasUrl;

	do {
		shortUrl = nanoid(8, url);

		try {
			hasUrl = await repository.getUrlByShortUrl(shortUrl);
		} catch (error) {
			console.log(error);
			return responseHelper.serverError("", res);
		}
	} while (hasUrl);

	let result;

	try {
		result = await repository.insertUrl(user, shortUrl, url);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (result.rowCount === 0) {
		return responseHelper.badRequest(
			{ message: "Não foi possível criar a url." },
			res
		);
	}

	responseHelper.created({ shortUrl }, res);
}

async function getUrl(req, res) {
	const { id } = req.params;

	if (isNaN(id)) return responseHelper.badRequest("", res);

	let url;

	try {
		url = await repository.getUrlById(id);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (!url) return responseHelper.notFound("", res);

	delete url.userId;
	delete url.createdAt;

	responseHelper.ok(url, res);
}

async function openUrl(req, res) {
	const { shortUrl } = req.params;

	let url;

	try {
		url = await repository.getUrlByShortUrl(shortUrl);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (!url) return responseHelper.notFound("", res);

	try {
		await repository.insertVisit(url.userId, url.id);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	res.redirect(url.url);
}

async function deleteUrl(req, res) {
	const { id } = res.locals;

	let result;

	try {
		result = await repository.deleteUrl(id);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (result.rowCount === 0) {
		return responseHelper.badRequest(
			{ message: "Não foi possível excluir a url." },
			res
		);
	}

	responseHelper.noContent("", res);
}

export { createUrl, getUrl, openUrl, deleteUrl };
