const DATA = require("../../data");
const helpers = require("../../helpers");
const express = require("express");
const router = express.Router();

/* HTTP Requests */

// GET Requests
router.get("/", getUsers); // ./Users
function getUsers(request, response) {
	response.status(200).json(DATA.users);
}

// ./Users/{id}
router.get("/:userId", getUserById);
function getUserById(request, response) {
	const { userId } = request.params;
	const userFound = helpers.searchInDataById(userId, DATA.users);
	
	if (!userFound) {
		response.status(404).json({message: "Error: No se encontró la información solicitada"});
	} else {
		response.status(200).json(userFound);
	}
}

// POST Requests
router.post("/", createUser); // ./Users
function createUser(request, response) {
	const userSubmitted = request.body;
	const validUser = helpers.validateUserInformation(userSubmitted, "full validation");
	
	if (!validUser) {
		response.status(400).json({message: "Error: Usuario Inválido."});
	} else {
		response.status(201).json({massage: "El usuario se creó correctamente.", userCreated: userSubmitted});
	}
}

// DELETE Requests
router.delete("/:userId", deleteUser); // ./Users/{id}
function deleteUser(request, response) {
	const { userId } = request.params;
	const userFound = helpers.searchInDataById(userId, DATA.users);
	
	if (!userFound) {
		response.status(404).json({message: "Error: No se encontró al usuario especificado"});
	} else {
		response.status(200).json({massage: "El usuario se borró correctamente.", userDeleted: userFound});
	}
}

// PATCH Requests
router.patch("/:userId", simpleUpdateUser); // ./Users/{id}
function simpleUpdateUser(request, response) {
	const { userId } = request.params;
	const userFound = helpers.searchInDataById(userId, DATA.users);
	
	if (!userFound) {
		response.status(404).json({message: "Error: No se encontró al usuario especificado"});
	} else {
		const updateInfo = request.body;
		const validInfo = helpers.validateUserInformation(updateInfo, "simple validation");
		
		if (validInfo) {
			response.status(200).json({
				massage: "El usuario se actualizó correctamente.",
				userBefore: userFound,
				userAfter: {...userFound, ...updateInfo}
			});
		} else {
			response.status(400).json({message: "Error: Los datos proporcionados para la actualización son incorrectos."});
		}
	}
}

// PUT Requests
router.put("/:userId", fullUpdateUser); // ./Users/{id}
function fullUpdateUser(request, response) {
	const { userId } = request.params;
	const userFound = helpers.searchInDataById(userId, DATA.users);
	
	if (!userFound) {
		response.status(404).json({message: "Error: No se encontró al usuario especificado"});
	} else {
		const updateInfo = request.body;
		const validInfo = helpers.validateUserInformation(updateInfo, "full validation");
		
		if (validInfo) {
			response.status(200).json({
				massage: "El usuario se actualizó correctamente.",
				userBefore: userFound,
				userAfter: {...userFound, ...updateInfo}
			});
		} else {
			response.status(400).json({message: "Error: Los datos proporcionados para la actualización son incorrectos."});
		}
	}
}

/* Export */
module.exports = router;