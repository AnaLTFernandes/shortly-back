import connection from "../database/db.js";

async function insertUser(name, email, passwordHash) {
	return connection.query(
		`INSERT INTO
            users
        (name, email, password)
        VALUES ($1, $2, $3);`,
		[name, email, passwordHash]
	);
}

async function getUserByEmail(email) {
	const response = (
		await connection.query(`SELECT * FROM users WHERE email = $1;`, [email])
	)?.rows[0];

	return response;
}

async function getSessionByToken(token) {
	const response = (
		await connection.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
	)?.rows[0];

	return response;
}

async function insertToken(userId, token) {
	return connection.query(
		`INSERT INTO
            sessions
        ("userId", token)
        VALUES ($1, $2);`,
		[userId, token]
	);
}

async function getActiveSessionFromUser(userId) {
	const response = (
		await connection.query(
			`SELECT * FROM sessions
            WHERE active = TRUE
                AND "userId" = $1;`,
			[userId]
		)
	)?.rows[0];

	return response;
}

async function getActiveSessionByToken(token) {
	const response = (
		await connection.query(
			`SELECT
                *
            FROM sessions
            WHERE token = $1
                AND active = TRUE;`,
			[token]
		)
	)?.rows[0];

	return response;
}

async function finishSession(token) {
	return connection.query(
		`UPDATE sessions SET active = FALSE WHERE token = $1;`,
		[token]
	);
}

export {
	insertUser,
	getUserByEmail,
	getSessionByToken,
	insertToken,
	getActiveSessionFromUser,
	getActiveSessionByToken,
	finishSession,
};
