import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function getRanking(req, res) {
	let ranking;

	try {
		ranking = (
			await connection.query(
				`SELECT
                    us.id, us.name,
                    ur."linksCount",
                    v."visitCount"
                FROM
                    users us
                JOIN
                    (SELECT
                        us.id AS "userId",
                        COUNT(ur) AS "linksCount"
                    FROM users us
                    LEFT JOIN urls ur
                        ON us.id = ur."userId"
                    GROUP BY us.id) ur
                ON us.id = ur."userId"
                JOIN
                    (SELECT
                        us.id AS "userId",
                        COUNT(v) AS "visitCount"
                    FROM users us
                    LEFT JOIN visits v
                        ON us.id = v."userId"
                    GROUP BY us.id) v
                ON us.id = v."userId"
                ORDER BY "visitCount" DESC
                LIMIT 10;`
			)
		).rows;
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.status(STATUS_CODE.OK).send(ranking);
}

export { getRanking };
