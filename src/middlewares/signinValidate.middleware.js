import bcrypt from "bcrypt";
import * as repository from "../repositories/auth.repository.js";
import * as responseHelper from "../helpers/response.helper.js";
import validateFields from "./validateFields.js";

async function signInValidate(req, res, next) {
	const { email, password } = req.body;

	const data = { email, password };

	const validation = validateFields(data, "loginSchema");

	if (validation.error) {
		return responseHelper.unprocessableEntity(
			{ message: validation.error },
			res
		);
	}

	let user;

	try {
		user = await repository.getUserByEmail(email);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	if (!user) {
		return responseHelper.unauthorized(
			{ message: "Email ou senha inválida." },
			res
		);
	}

	const isPasswordValid = bcrypt.compareSync(password, user.password);

	if (!isPasswordValid) {
		return responseHelper.unauthorized(
			{ message: "Email ou senha inválida." },
			res
		);
	}

	try {
		const hasActiveSession = await repository.getActiveSessionFromUser(user.id);

		if (hasActiveSession) return responseHelper.badRequest("", res);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	res.locals.id = user.id;

	next();
}

export default signInValidate;
