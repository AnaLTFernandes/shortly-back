import connection from "../database/db.js";

async function getUserUrls(userId) {
	const response = (
		await connection.query(
			`SELECT
                u.id, u."shortUrl", u.url,
                COUNT(v."urlId") AS "visitCount"
            FROM urls u
            LEFT JOIN visits v
                ON u.id = v."urlId"
            WHERE u."userId" = $1
            GROUP BY v."urlId", u.id
            ORDER BY u.id;`,
			[userId]
		)
	)?.rows;

	return response;
}

async function getActiveSession(token) {
	const response = (
		await connection.query(
			`SELECT
                "userId"
            FROM sessions
            WHERE token = $1
                AND active = TRUE;`,
			[token]
		)
	)?.rows[0];

	return response;
}

async function getUserData(userId) {
	const response = (
		await connection.query(
			`SELECT
                u.id, u.name,
                COUNT(v."userId") AS "visitCount"
            FROM users u
            LEFT JOIN visits v
                ON u.id = v."userId"
            WHERE u.id = $1
            GROUP BY u.id;`,
			[userId]
		)
	)?.rows[0];

	return response;
}

export { getUserUrls, getActiveSession, getUserData };
