import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import * as repository from "../repositories/auth.repository.js";
import { STATUS_CODE } from "../enums/statusCode.js";

async function signUp(req, res) {
	const { name, email, password } = res.locals.body;

	const passwordHash = bcrypt.hashSync(password, 13);

	let result;

	try {
		result = await repository.insertUser(name, email, passwordHash);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (result.rowCount === 0) {
		return res
			.status(STATUS_CODE.BAD_REQUEST)
			.send({ message: "Não foi possível criar usuário." });
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
			hasSession = await repository.getSessionByToken(token);
		} catch (error) {
			console.log(error);
			return res.sendStatus(STATUS_CODE.SERVER_ERROR);
		}
	} while (hasSession);

	let result;

	try {
		result = await repository.insertToken(id, token);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (result.rowCount === 0) {
		return res
			.status(STATUS_CODE.BAD_REQUEST)
			.send({ message: "Não foi possível fazer o login." });
	}

	res.status(STATUS_CODE.OK).send({ token });
}

async function logout(req, res) {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	let session;

	try {
		session = await repository.getActiveSessionByToken(token);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (!session) return res.sendStatus(STATUS_CODE.UNAUTHORIZED);

	let result;

	try {
		result = await repository.finishSession(session.token);
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	if (result.rowCount === 0) {
		return res
			.status(STATUS_CODE.BAD_REQUEST)
			.send({ message: "Não foi possível finalizar sessão." });
	}

	res.sendStatus(STATUS_CODE.OK);
}

export { signUp, signIn, logout };
