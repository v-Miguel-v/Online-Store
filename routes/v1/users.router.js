/* Instances Initialization */
const UsersService = require("../../services/users.service");
	const service = new UsersService();

const express = require("express");
	const router = express.Router();

const validationHandler = require("../../middlewares/validation.handler");
	const { fullValidationSchema, simpleValidationSchema, idValidationSchema } = require("../../schemas/users.schema");

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
router.get("/:id", validationHandler(idValidationSchema, "params"), getUserById);
async function getUserById(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const userFound = await service.search(id);
		response.status(200).json(userFound);
	} catch (error) {
		errorHandlers(error);
	}
}

// POST Requests
router.post("/", validationHandler(fullValidationSchema, "body"), createUser); // ./Users
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
router.delete("/:id", validationHandler(idValidationSchema, "params"), deleteUser); // ./Users/{id}
async function deleteUser(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const userDeleted = await service.delete(id);
		response.status(200).json({massage: "El usuario se borró correctamente.", userDeleted});
	} catch (error) {
		errorHandlers(error);
	}
}

// PATCH Requests
router.patch("/:id",
	validationHandler(idValidationSchema, "params"),
	validationHandler(simpleValidationSchema, "body"),
simpleUpdateUser); // ./Users/{id}
async function simpleUpdateUser(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const updateInfo = request.body;
		const originalUser = await service.search(id);
		const userUpdated = await service.update(id, updateInfo);
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
router.put("/:id",
	validationHandler(idValidationSchema, "params"),
	validationHandler(fullValidationSchema, "body"),
fullUpdateUser); // ./Users/{id}
async function fullUpdateUser(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const updateInfo = request.body;
		const originalUser = await service.search(id);
		const userUpdated = await service.update(id, updateInfo);
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