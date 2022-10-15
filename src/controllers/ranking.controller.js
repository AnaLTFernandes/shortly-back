import * as repository from "../repositories/ranking.repository.js";
import * as responseHelper from "../helpers/response.helper.js";

async function getRanking(req, res) {
	let ranking;

	try {
		ranking = await repository.getRanking();
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	responseHelper.ok(ranking, res);
}

export { getRanking };
