import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

const emailRegex = new RegExp(
	`(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]
    \.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]
    \.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+
    \.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})`
);

async function urlValidate(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");
	let { url } = req.body;

	if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	if (!url || !url?.match(emailRegex)) {
		return res
			.status(STATUS_CODE.UNPROCESSABLE_ENTITY)
			.send({ message: "Url inválida." });
	}

	url = url.match(emailRegex)[0];

	let session;

	try {
		session = (
			await connection.query(
				`SELECT * FROM sessions WHERE token = $1 AND active = TRUE`,
				[token]
			)
		)?.rows[0];
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!session) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	res.locals.user = session.userId;
	res.locals.url = url;

	next();
}

export default urlValidate;
