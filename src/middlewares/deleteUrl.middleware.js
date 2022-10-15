import * as repository from "../repositories/urls.reporitory.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function deleteValidate(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");
	let { id } = req.params;

	if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	if (isNaN(id)) return res.sendStatus(STATUS_CODE.BAD_REQUEST);

	let session;

	try {
		session = await repository.getSessionByToken(token);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!session) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	let url;

	try {
		url = await repository.getUrlById(id);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!url) return res.sendStatus(STATUS_CODE.NOT_FOUND);

	if (session.userId !== url.userId) {
		return res.sendStatus(STATUS_CODE.UNAUTHORIZED);
	}

	res.locals.id = id;

	next();
}

export default deleteValidate;
