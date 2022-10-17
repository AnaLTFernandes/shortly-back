import connection from "../database/db.js";

async function getUrlById(id) {
	const response = (
		await connection.query(`SELECT * FROM urls WHERE id = $1;`, [id])
	)?.rows[0];

	return response;
}

async function getUrlByShortUrl(shortUrl) {
	const response = (
		await connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1;`, [
			shortUrl,
		])
	)?.rows[0];

	return response;
}

async function insertUrl(user, shortUrl, url) {
	return connection.query(
		`INSERT INTO
            urls
        ("userId", "shortUrl", url)
        VALUES ($1, $2, $3);`,
		[user, shortUrl, url]
	);
}

async function insertVisit(userId, id) {
	return connection.query(
		`INSERT INTO
            visits
        ("userId", "urlId")
        VALUES ($1, $2);`,
		[userId, id]
	);
}

async function deleteUrl(id) {
	return connection.query(`DELETE FROM urls WHERE id = $1;`, [id]);
}

async function getSessionByToken(token) {
	const response = (
		await connection.query(
			`SELECT * FROM sessions WHERE token = $1 AND active = TRUE;`,
			[token]
		)
	)?.rows[0];

	return response;
}

async function getUrls() {
	const response = (
		await connection.query(`SELECT id, url FROM urls ORDER BY id DESC;`)
	).rows;

	return response;
}

export {
	getUrlById,
	getUrlByShortUrl,
	insertVisit,
	deleteUrl,
	insertUrl,
	getSessionByToken,
	getUrls,
};
