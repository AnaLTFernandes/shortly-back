import * as repository from "../repositories/ranking.repository.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function getRanking(req, res) {
	let ranking;

	try {
		ranking = await repository.getRanking();
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.status(STATUS_CODE.OK).send(ranking);
}

export { getRanking };
