import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import * as repository from "../repositories/auth.repository.js";
import * as responseHelper from "../helpers/response.helper.js";

async function signUp(req, res) {
	const { name, email, password } = res.locals.body;

	const passwordHash = bcrypt.hashSync(password, 13);

	let result;

	try {
		result = await repository.insertUser(name, email, passwordHash);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (result.rowCount === 0) {
		return responseHelper.badRequest(
			{ message: "Não foi possível criar usuário." },
			res
		);
	}

	responseHelper.created("", res);
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
			return responseHelper.serverError("", res);
		}
	} while (hasSession);

	let result;

	try {
		result = await repository.insertToken(id, token);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (result.rowCount === 0) {
		return responseHelper.badRequest(
			{ message: "Não foi possível fazer o login." },
			res
		);
	}

	responseHelper.ok({ token }, res);
}

async function logout(req, res) {
	const token = req.headers.authorization?.replace("Bearer ", "");

	if (!token) return responseHelper.unauthorized("", res);

	let session;

	try {
		session = await repository.getActiveSessionByToken(token);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (!session) return responseHelper.unauthorized("", res);

	let result;

	try {
		result = await repository.finishSession(session.token);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (result.rowCount === 0) {
		return responseHelper.badRequest(
			{ message: "Não foi possível finalizar sessão." },
			res
		);
	}

	responseHelper.ok("", res);
}

export { signUp, signIn, logout };
