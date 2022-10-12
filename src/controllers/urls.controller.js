import { nanoid } from "nanoid";
import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function createUrl(req, res) {
	const { url, user } = res.locals;

	const shortUrl = nanoid(8, url);

	try {
		await connection.query(
			`
            INSERT INTO
                urls
            ("userId", "shortUrl", url)
            VALUES ($1, $2, $3)`,
			[user, shortUrl, url]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.status(STATUS_CODE.CREATED).send({ shortUrl });
}

async function getUrl(req, res) {
	const { id } = req.params;

	if (isNaN(id)) return res.sendStatus(STATUS_CODE.BAD_REQUEST);

	let url;

	try {
		url = (await connection.query(`SELECT * FROM urls WHERE id = $1`, [id]))
			.rows[0];
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!url) return res.sendStatus(STATUS_CODE.NOT_FOUND);

    delete url.userId;
    delete url.createdAt;

	res.status(STATUS_CODE.OK).send(url);
}

export { createUrl, getUrl };