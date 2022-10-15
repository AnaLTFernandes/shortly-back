import * as repository from "../repositories/users.repository.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function getUserData(req, res) {
	const { user } = res.locals;

	let data = { ...user };

	try {
		data.shortenedUrls = await repository.getUserUrls(user.id);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.status(STATUS_CODE.OK).send(data);
}

export { getUserData };
