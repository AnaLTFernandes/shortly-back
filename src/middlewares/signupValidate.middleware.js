import * as repository from "../repositories/auth.repository.js";
import * as responseHelper from "../helpers/response.helper.js";
import validateFields from "./validateFields.js";

async function signUpValidate(req, res, next) {
	const { name, email, password, confirmPassword } = req.body;

	const data = { name, email, password, confirmPassword };

	const validation = validateFields(data, "userSchema");

	if (validation.error) {
		return responseHelper.unprocessableEntity(
			{ message: validation.error },
			res
		);
	}

	try {
		const hasEmail = await repository.getUserByEmail(email);

		if (hasEmail)
			return responseHelper.conflict({ message: "Usuário já existe." }, res);
	} catch (error) {
		console.log(error);
		return responseHelper.serverError("", res);
	}

	res.locals.body = data;

	next();
}

export default signUpValidate;
