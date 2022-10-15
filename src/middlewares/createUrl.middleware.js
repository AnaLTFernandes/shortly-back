import * as repository from "../repositories/urls.reporitory.js";
import { STATUS_CODE } from "../enums/statusCode.js";

const urlRegex = new RegExp(
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
);

async function urlValidate(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");
	let { url } = req.body;

	if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	if (!url || !url?.match(urlRegex)) {
		return res
			.status(STATUS_CODE.UNPROCESSABLE_ENTITY)
			.send({ message: "Url inválida." });
	}

	let session;

	try {
		session = await repository.getSessionByToken(token);
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
