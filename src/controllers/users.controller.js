import * as repository from "../repositories/users.repository.js";
import * as responseHelper from "../helpers/response.helper.js";

async function getUserData(req, res) {
	const { user } = res.locals;

	let data = { ...user };

	try {
		data.shortenedUrls = await repository.getUserUrls(user.id);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	responseHelper.ok(data, res);
}

export { getUserData };
