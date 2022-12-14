import loginSchema from "../schemas/login.schema.js";
import userSchema from "../schemas/user.schema.js";

const schemas = {
	userSchema,
	loginSchema,
};

function validateFields(data, schemaName) {
	const validate = schemas[schemaName].validate(data, { abortEarly: false });

	const response = {};

	if (validate.error) {
		const errors = validate.error.details.map((error) => error.message);

		response.error = errors;
	}

	return response;
}

export default validateFields;
