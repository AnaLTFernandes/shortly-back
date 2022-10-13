import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function validateUser(req, res, next) {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	let session;

	try {
		session = (
			await connection.query(
				`SELECT
                    "userId"
                FROM sessions
                WHERE token = $1
                    AND active = TRUE;`,
				[token]
			)
		)?.rows[0];
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!session) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	let user;

	try {
		user = (
			await connection.query(
				`SELECT
                    u.id, u.name,
                    COUNT(v."userId") AS "visitCount"
                FROM users u
                LEFT JOIN visits v
                    ON u.id = v."userId"
                WHERE u.id = $1
                GROUP BY u.id;`,
				[session.userId]
			)
		)?.rows[0];
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!user) return res.sendStatus(STATUS_CODE.NOT_FOUND);

	res.locals.user = user;

	next();
}

export default validateUser;
