import * as repository from "../repositories/users.repository.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function validateUser(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	let session;

	try {
		session = await repository.getActiveSession(token);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!session) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	let user;

	try {
		user = await repository.getUserData(session.userId);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!user) return res.sendStatus(STATUS_CODE.NOT_FOUND);

	res.locals.user = user;

	next();
}

export default validateUser;
