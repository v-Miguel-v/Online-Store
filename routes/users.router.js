const DATA = require("../data");
const helpers = require("../helpers");
const express = require("express");
const router = express.Router();

/* HTTP Requests */
// GET Requests
router.get("/", getUsers);
router.get("/:userId", getUserById);

/* ENDPOINTS */
// ./Users
function getUsers(request, response) { response.json(DATA.users); }

// ./Users/{id}
function getUserById(request, response) {
	const { userId } = request.params;
	let userFound = helpers.searchInDataById(userId, DATA.users);
	
	if (!userFound) {
		response.send("No se encontró la información solicitada");
	} else {
		response.json(userFound);
	}
}

/* Export */
module.exports = router;