const DATA = require("../../data");
const helpers = require("../../helpers");
const express = require("express");
const router = express.Router();

/* HTTP Requests */

// GET Requests
router.get("/", getUsers); // ./Users
function getUsers(request, response) { response.json(DATA.users); }

router.get("/:userId", getUserById); // ./Users/{id}
function getUserById(request, response) {
	const { userId } = request.params;
	let userFound = helpers.searchInDataById(userId, DATA.users);
	
	if (!userFound) {
		response.send("No se encontró la información solicitada");
	} else {
		response.json(userFound);
	}
}

// POST Requests
router.post("/", createUser);
function createUser(request, response) { response.json(DATA.users); }
/*
function createProduct(request, response) {
	const body = request.body;
	response.json({
		message: "created",
		data: body
	});
}
*/

/* Export */
module.exports = router;