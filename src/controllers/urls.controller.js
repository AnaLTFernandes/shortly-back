import { nanoid } from "nanoid";
import { STATUS_CODE } from "../enums/statusCode.js";
import * as repository from "../repositories/urls.reporitory.js";

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
			return res.sendStatus(STATUS_CODE.SERVER_ERROR);
		}
	} while (hasUrl);

	let result;

	try {
		result = await repository.insertUrl(user, shortUrl, url);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (result.rowCount === 0) {
		return res
			.status(STATUS_CODE.BAD_REQUEST)
			.send({ message: "Não foi possível criar a url." });
	}

	res.status(STATUS_CODE.CREATED).send({ shortUrl });
}

async function getUrl(req, res) {
	const { id } = req.params;

	if (isNaN(id)) return res.sendStatus(STATUS_CODE.BAD_REQUEST);

	let url;

	try {
		url = await repository.getUrlById(id);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!url) return res.sendStatus(STATUS_CODE.NOT_FOUND);

	delete url.userId;
	delete url.createdAt;

	res.status(STATUS_CODE.OK).send(url);
}

async function openUrl(req, res) {
	const { shortUrl } = req.params;

	let url;

	try {
		url = await repository.getUrlByShortUrl(shortUrl);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!url) return res.sendStatus(STATUS_CODE.NOT_FOUND);

	try {
		await repository.insertVisit(url.userId, url.id);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
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
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (result.rowCount === 0) {
		return res
			.status(STATUS_CODE.BAD_REQUEST)
			.send({ message: "Não foi possível excluir a url." });
	}

	res.sendStatus(STATUS_CODE.NO_CONTENT);
}

export { createUrl, getUrl, openUrl, deleteUrl };
