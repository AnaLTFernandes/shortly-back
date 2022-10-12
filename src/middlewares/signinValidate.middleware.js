import bcrypt from "bcrypt";
import connection from "../database/db.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import validateFields from "./validateFields.js";

async function signInValidate(req, res, next) {
	const { email, password } = req.body;

	const data = { email, password };

	const validation = validateFields(data, "loginSchema");

	if (validation.error) {
		return res
			.status(STATUS_CODE.UNPROCESSABLE_ENTITY)
			.send({ message: validation.error });
	}

	let user;

	try {
		user = (
			await connection.query(`SELECT * FROM users WHERE email = $1`, [email])
		)?.rows[0];
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!user) {
		return res
			.status(STATUS_CODE.UNAUTHORIZED)
			.send({ message: "Email ou senha inválida." });
	}

	const isPasswordValid = bcrypt.compareSync(password, user.password);

	if (!isPasswordValid) {
		return res
			.status(STATUS_CODE.UNAUTHORIZED)
			.send({ message: "Email ou senha inválida." });
	}

	try {
		const hasActiveSession = (
			await connection.query(
				`SELECT * FROM sessions
                WHERE active = TRUE
                    AND "userId" = $1`,
				[user.id]
			)
		)?.rows[0];

		if (hasActiveSession) return res.sendStatus(STATUS_CODE.BAD_REQUEST);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.locals.id = user.id;

	next();
}

export default signInValidate;
