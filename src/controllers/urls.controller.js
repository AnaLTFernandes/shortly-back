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

export { createUrl };
