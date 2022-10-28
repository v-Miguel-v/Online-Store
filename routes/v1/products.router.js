const DATA = require("../../data");
const helpers = require("../../helpers");
const express = require("express");
const router = express.Router();

/* HTTP Requests */

// GET Requests
router.get("/", getProducts); // ./Products
function getProducts(request, response) {
	response.json(DATA.products);
}

// ./Products/{productId}
router.get("/:productId", getProductById);
function getProductById(request, response) {
	const { productId } = request.params;
	let productFound = helpers.searchInDataById(productId, DATA.products);
	
	if (!productFound) {
		response.json({message: "Error: No se encontró la información solicitada"});
	} else {
		response.json(productFound);
	}
}

// POST Requests
router.post("/", createProduct); // ./Products
function createProduct(request, response) {
	const productSubmitted = request.body;
	const validProduct = helpers.validateProductForCreation(productSubmitted);
	
	if (!validProduct) {
		response.json({message: "Error: Producto Inválido."});
	} else {
		response.json({massage: "El producto se creó correctamente."});
	}
}

// DELETE Requests
router.delete("/:productId", deleteProduct); // ./Products/{productId}
function deleteProduct(request, response) {
	const { productId } = request.params;
	let productFound = helpers.searchInDataById(productId, DATA.products);
	
	if (!productFound) {
		response.json({message: "Error: No se encontró el producto especificado."});
	} else {
		response.json({message: "El producto se borró correctamente.", product: productFound});
	}
}

// PATCH Requests

// PUT Requests

/* Export */
module.exports = router;