import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function signUp(req, res) {
	const { name, email, password } = res.locals.body;

	const passwordHash = bcrypt.hashSync(password, 13);

	try {
		await connection.query(
			`INSERT INTO
                users
            (name, email, password)
            VALUES ($1, $2, $3);`,
			[name, email, passwordHash]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.CREATED);
}

async function signIn(req, res) {
	const { id } = res.locals;

	let token;
	let hasSession;

	do {
		token = nanoid(50);

		try {
			hasSession = (
				await connection.query(`SELECT * FROM sessions WHERE token = $1;`, [
					token,
				])
			)?.rows[0];
		} catch (error) {
			console.log(error);
			return res.sendStatus(STATUS_CODE.SERVER_ERROR);
		}
	} while (hasSession);

	try {
		await connection.query(
			`INSERT INTO
                sessions
            ("userId", token)
            VALUES ($1, $2);`,
			[id, token]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.status(STATUS_CODE.OK).send({ token });
}

async function logout(req, res) {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	let session;

	try {
		session = (
			await connection.query(
				`SELECT
                    *
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

	try {
		await connection.query(
			`UPDATE sessions SET active = FALSE WHERE token = $1;`,
			[session.token]
		);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.sendStatus(STATUS_CODE.OK);
}

export { signUp, signIn, logout };
