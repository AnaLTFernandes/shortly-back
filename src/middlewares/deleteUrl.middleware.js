import * as repository from "../repositories/urls.reporitory.js";
import * as responseHelper from "../helpers/response.helper.js";

async function deleteValidate(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");
	let { id } = req.params;

	if (!token) return responseHelper.unauthorized("", res);

	if (isNaN(id)) return responseHelper.badRequest("", res);

	let session;

	try {
		session = await repository.getSessionByToken(token);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (!session) return responseHelper.unauthorized("", res);

	let url;

	try {
		url = await repository.getUrlById(id);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (!url) return responseHelper.notFound("", res);

	if (session.userId !== url.userId) {
		return responseHelper.unauthorized("", res);
	}

	res.locals.id = id;

	next();
}

export default deleteValidate;
