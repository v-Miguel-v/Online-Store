const DATA = require("../data");
const helpers = require("../helpers");
const express = require("express");
const router = express.Router();

/* HTTP Requests */
// GET Requests
router.get("/", getCategories);
router.get("/:categoryId", getCategoryById);
router.get("/:categoryId/products", getProductsByCategory);
router.get("/:categoryId/products/:productId", getProductByIdFromCategory);

/* ENDPOINTS */
// ./Categories
function getCategories(request, response) { response.json(DATA.categories); }

// ./Categories/{categoryId}
function getCategoryById(request, response) {
	const { categoryId } = request.params;
	let categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.send("No se encontró la información solicitada");
	} else {
		response.json(categoryFound);
	}
}

// ./Categories/{categoryId}/products
function getProductsByCategory(request, response) {
	const { categoryId } = request.params;
	let categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.send("No se encontró la información solicitada");
	} else {
		response.json(DATA.products.filter(product => product.category.id === categoryFound.id));
	}
}

// ./Categories/{categoryId}/products/{productId}
function getProductByIdFromCategory(request, response) {
	const { categoryId, productId } = request.params;
	let categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.send("No se encontró la información solicitada");
	} else {
		const categoryProducts = DATA.products.filter(product => product.category.id === categoryFound.id);
		let productFound = helpers.searchInDataById(productId, categoryProducts);
		
		if (productFound) {
			response.json(productFound);
		} else {
			response.send("No se encontró la información solicitada");
		}
	}
}

/* Export */
module.exports = router;