import * as repository from "../repositories/auth.repository.js";
import { STATUS_CODE } from "../enums/statusCode.js";
import validateFields from "./validateFields.js";

async function signUpValidate(req, res, next) {
	const { name, email, password, confirmPassword } = req.body;

	const data = { name, email, password, confirmPassword };

	const validation = validateFields(data, "userSchema");

	if (validation.error) {
		return res
			.status(STATUS_CODE.UNPROCESSABLE_ENTITY)
			.send({ message: validation.error });
	}

	try {
		const hasEmail = await repository.getUserByEmail(email);

		if (hasEmail)
			return res
				.status(STATUS_CODE.CONFLICT)
				.send({ message: "Usuário já existe." });
	} catch (error) {
		console.log(error);
		return res.sendStatus(STATUS_CODE.SERVER_ERROR);
	}

	res.locals.body = data;

	next();
}

export default signUpValidate;
