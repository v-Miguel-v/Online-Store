const DATA = require("../data");
const helpers = require("../helpers");
const express = require("express");
const router = express.Router();

/* HTTP Requests */
// GET Requests
router.get("/", getProducts);
router.get("/:productId", getProductById);

/* ENDPOINTS */
// ./Products
function getProducts(request, response) { response.json(DATA.products); }

// ./Products/{productId}
function getProductById(request, response) {
	const { productId } = request.params;
	let productFound = helpers.searchInDataById(productId, DATA.products);
	
	if (!productFound) {
		response.send("No se encontró la información solicitada");
	} else {
		response.json(productFound);
	}
}

/* Export */
module.exports = router;