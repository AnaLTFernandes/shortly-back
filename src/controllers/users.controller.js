import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function getUserData(req, res) {
	const { user } = res.locals;

	let data = { ...user };

	try {
		data.shortenedUrls = (
			await connection.query(
				`SELECT
                    u.id, u."shortUrl", u.url,
                    COUNT(v."urlId") AS "visitCount"
                FROM urls u
                JOIN visits v
                    ON u.id = v."urlId"
                WHERE u."userId" = $1
                GROUP BY v."urlId", u.id
                ORDER BY u.id;`,
				[user.id]
			)
		)?.rows;
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.status(STATUS_CODE.OK).send(data);
}

export { getUserData };
