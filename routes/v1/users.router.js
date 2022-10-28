const DATA = require("../../data");
const helpers = require("../../helpers");
const express = require("express");
const router = express.Router();

/* HTTP Requests */

// GET Requests
router.get("/", getUsers); // ./Users
function getUsers(request, response) {
	response.json(DATA.users);
}

// ./Users/{id}
router.get("/:userId", getUserById);
function getUserById(request, response) {
	const { userId } = request.params;
	let userFound = helpers.searchInDataById(userId, DATA.users);
	
	if (!userFound) {
		response.json({message: "Error: No se encontró la información solicitada"});
	} else {
		response.json(userFound);
	}
}

// POST Requests
router.post("/", createUser); // ./Users
function createUser(request, response) {
	const userSubmitted = request.body;
	const validUser = helpers.validateUserForCreation(userSubmitted);
	
	if (!validUser) {
		response.json({message: "Error: Usuario Inválido."});
	} else {
		response.json({massage: "El usuario se creó correctamente."});
	}
}

// DELETE Requests
router.delete("/:userId", deleteUser); // ./Users/{id}
function deleteUser(request, response) {
	const { userId } = request.params;
	let userFound = helpers.searchInDataById(userId, DATA.users);
	
	if (!userFound) {
		response.json({message: "Error: No se encontró al usuario especificado"});
	} else {
		response.json({massage: "El usuario se borró correctamente.", user: userFound});
	}
}

// PATCH Requests

// PUT Requests

/* Export */
module.exports = router;