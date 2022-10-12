import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function deleteValidate(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");
	let { id } = req.params;

	if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	if (isNaN(id)) return res.sendStatus(STATUS_CODE.BAD_REQUEST);

	let session;

	try {
		session = (
			await connection.query(
				`SELECT * FROM sessions WHERE token = $1 AND active = TRUE`,
				[token]
			)
		)?.rows[0];
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!session) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	let url;

	try {
		url = (await connection.query(`SELECT * FROM urls WHERE id = $1`, [id]))
			?.rows[0];
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
