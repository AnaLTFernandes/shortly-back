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

	const token = nanoid(50);

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

export { signUp, signIn };
