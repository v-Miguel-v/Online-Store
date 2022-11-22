/* Instances Initialization */
const UsersService = require("../../services/users.service");
	const service = new UsersService();

const express = require("express");
	const router = express.Router();

// GET Requests
router.get("/", getUsers); // ./Users
async function getUsers(request, response, errorHandlers) {
	try {
		const allUsers = await service.getAll();
		response.status(200).json(allUsers);
	} catch (error) {
		errorHandlers(error);
	}
}

// ./Users/{id}
router.get("/:userId", getUserById);
async function getUserById(request, response, errorHandlers) {
	try {
		const { userId } = request.params;
		const userFound = await service.search(userId);
		response.status(200).json(userFound);
	} catch (error) {
		errorHandlers(error);
	}
}

// POST Requests
router.post("/", createUser); // ./Users
async function createUser(request, response, errorHandlers) {
	try {
		const givenUser = request.body;
		const newUser = await service.create(givenUser);
		response.status(201).json({massage: "El usuario se creó correctamente.", userCreated: newUser});
	} catch (error) {
		errorHandlers(error);
	}
}

// DELETE Requests
router.delete("/:userId", deleteUser); // ./Users/{id}
async function deleteUser(request, response, errorHandlers) {
	try {
		const { userId } = request.params;
		const userDeleted = await service.delete(userId);
		response.status(200).json({massage: "El usuario se borró correctamente.", userDeleted});
	} catch (error) {
		errorHandlers(error);
	}
}

// PATCH Requests
router.patch("/:userId", simpleUpdateUser); // ./Users/{id}
async function simpleUpdateUser(request, response, errorHandlers) {
	try {
		const { userId } = request.params;
		const updateInfo = request.body;
		const originalUser = await service.search(userId);
		const userUpdated = await service.update(userId, updateInfo, "simple update");
		response.status(200).json({
			massage: "El usuario se actualizó correctamente.",
			userBefore: originalUser,
			userAfter: userUpdated
		});
	} catch (error) {
		errorHandlers(error);
	}
}

// PUT Requests
router.put("/:userId", fullUpdateUser); // ./Users/{id}
async function fullUpdateUser(request, response, errorHandlers) {
	try {
		const { userId } = request.params;
		const updateInfo = request.body;
		const originalUser = await service.search(userId);
		const userUpdated = await service.update(userId, updateInfo, "full update");
		response.status(200).json({
			massage: "El usuario se actualizó correctamente.",
			userBefore: originalUser,
			userAfter: userUpdated
		});
	} catch (error) {
		errorHandlers(error);
	}
}

/* Export */
module.exports = router;