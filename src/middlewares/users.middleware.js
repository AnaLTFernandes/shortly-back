import * as repository from "../repositories/users.repository.js";
import * as responseHelper from "../helpers/response.helper.js";

async function validateUser(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) return responseHelper.unauthorized("", res);

	let session;

	try {
		session = await repository.getActiveSession(token);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (!session) return responseHelper.unauthorized("", res);

	let user;

	try {
		user = await repository.getUserData(session.userId);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (!user) return responseHelper.notFound("", res);

	res.locals.user = user;

	next();
}

export default validateUser;
