function logErrors(error, request, response, nextErrorHandler) {
	console.group("Log Errors:");
		console.error(error);
	console.groupEnd("Log Errors:");
	nextErrorHandler(error);
}

function boomErrorHandler(error, request, response, nextErrorHandler) {
	if (error.isBoom) {
		const { output } = error;
		console.log("Boom Error Handler");
		response.status(output.statusCode).json(output.payload);
	} else {
		nextErrorHandler(error);
	}
}

function serverErrorHandler(error, request, response, nextErrorHandler) {
	console.log("Server Error Handler");
	response.status(error.statusCode || 500).json({
		status: error.statusCode || 500,
		error: error.type || "Internal Server Error",
		message: error.message
	});
}

module.exports = { logErrors, boomErrorHandler, serverErrorHandler };