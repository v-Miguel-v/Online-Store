/* Instances Initialization */
const UsersService = require("../../services/users.service");
	const service = new UsersService();

const express = require("express");
	const router = express.Router();

// GET Requests
router.get("/", getUsers); // ./Users
function getUsers(request, response) {
	const allUsers = service.getAll();
	response.json(allUsers);
}

// ./Users/{id}
router.get("/:userId", getUserById);
function getUserById(request, response) {
	const { userId } = request.params;
	const userFound = service.search(userId);
	
	if (!userFound) {
		response.status(404).json({message: "Error: No se encontró la información solicitada."});
	} else {
		response.status(200).json(userFound);
	}
}

// POST Requests
router.post("/", createUser); // ./Users
function createUser(request, response) {
	const givenUser = request.body;
	const validUser = service.validate(givenUser, "full validation");
	
	if (!validUser) {
		response.status(400).json({message: "Error: Usuario Inválido."});
	} else {
		const newUser = service.create(givenUser);
		response.status(201).json({massage: "El usuario se creó correctamente.", userCreated: newUser});
	}
}

// DELETE Requests
router.delete("/:userId", deleteUser); // ./Users/{id}
function deleteUser(request, response) {
	const { userId } = request.params;
	const userFound = service.search(userId);
	
	if (!userFound) {
		response.status(404).json({message: "Error: No se encontró al usuario especificado."});
	} else {
		service.delete(userId);
		response.status(200).json({massage: "El usuario se borró correctamente.", userDeleted: userFound});
	}
}

// PATCH Requests
router.patch("/:userId", simpleUpdateUser); // ./Users/{id}
function simpleUpdateUser(request, response) {
	const { userId } = request.params;
	const userFound = service.search(userId);
	
	if (!userFound) {
		response.status(404).json({message: "Error: No se encontró al usuario especificado."});
	} else {
		const updateInfo = request.body;
		const validInfo = service.validate(updateInfo, "simple validation");
		
		if (validInfo) {
			service.simpleUpdate(userId, updateInfo);
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
	const userFound = service.search(userId);
	
	if (!userFound) {
		response.status(404).json({message: "Error: No se encontró al usuario especificado."});
	} else {
		const updateInfo = request.body;
		const validInfo = service.validate(updateInfo, "full validation");
		
		if (validInfo) {
			service.fullUpdate(userId, updateInfo);
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