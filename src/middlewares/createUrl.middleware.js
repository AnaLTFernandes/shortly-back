import * as repository from "../repositories/urls.reporitory.js";
import * as responseHelper from "../helpers/response.helper.js";

const urlRegex = new RegExp(
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
);

async function urlValidate(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");
	let { url } = req.body;

	if (!token) return responseHelper.unauthorized("", res);

	if (!url || !url?.match(urlRegex)) {
		return responseHelper.unprocessableEntity(
			{ message: "Url inválida." },
			res
		);
	}

	let session;

	try {
		session = await repository.getSessionByToken(token);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (!session) return responseHelper.unauthorized("", res);

	res.locals.user = session.userId;
	res.locals.url = url;

	next();
}

export default urlValidate;
