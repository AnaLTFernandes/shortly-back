import { STATUS_CODE } from "../enums/statusCode.js";

function ok(message, res) {
	res.status(STATUS_CODE.OK).send(message);
}

function created(message, res) {
	res.status(STATUS_CODE.CREATED).send(message);
}

function noContent(message, res) {
	res.status(STATUS_CODE.NO_CONTENT).send(message);
}

function badRequest(message, res) {
	res.status(STATUS_CODE.BAD_REQUEST).send(message);
}

function unauthorized(message, res) {
	res.status(STATUS_CODE.UNAUTHORIZED).send(message);
}

function notFound(message, res) {
	res.status(STATUS_CODE.NOT_FOUND).send(message);
}

function conflict(message, res) {
	res.status(STATUS_CODE.CONFLICT).send(message);
}

function unprocessableEntity(message, res) {
	res.status(STATUS_CODE.UNPROCESSABLE_ENTITY).send(message);
}

function serverError(message, res) {
	res.status(STATUS_CODE.SERVER_ERROR).send(message);
}

export {
	ok,
	created,
	noContent,
	badRequest,
	unauthorized,
	notFound,
	conflict,
	unprocessableEntity,
	serverError,
};
