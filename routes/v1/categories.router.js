const DATA = require("../../data");
const helpers = require("../../helpers");
const express = require("express");
const router = express.Router();

/* HTTP Requests */

// GET Requests
router.get("/", getCategories); // ./Categories
function getCategories(request, response) {
	response.json(DATA.categories);
}

// ./Categories/{categoryId}
router.get("/:categoryId", getCategoryById);
function getCategoryById(request, response) {
	const { categoryId } = request.params;
	let categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.json({message: "Error: No se encontró la información solicitada"});
	} else {
		response.json(categoryFound);
	}
}

// ./Categories/{categoryId}/products
router.get("/:categoryId/products", getProductsByCategory);
function getProductsByCategory(request, response) {
	const { categoryId } = request.params;
	let categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.json({message: "Error: No se encontró la información solicitada"});
	} else {
		response.json(DATA.products.filter(product => product.category.id === categoryFound.id));
	}
}

// ./Categories/{categoryId}/products/{productId}
router.get("/:categoryId/products/:productId", getProductByIdFromCategory);
function getProductByIdFromCategory(request, response) {
	const { categoryId, productId } = request.params;
	let categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.json({message: "Error: No se encontró la información solicitada"});
	} else {
		const categoryProducts = DATA.products.filter(product => product.category.id === categoryFound.id);
		let productFound = helpers.searchInDataById(productId, categoryProducts);
		
		if (productFound) {
			response.json(productFound);
		} else {
			response.json({message: "Error: No se encontró la información solicitada"});
		}
	}
}

// POST Requests
router.post("/", createCategory); // ./Categories
function createCategory(request, response) {
	const categorySubmitted = request.body;
	const validCategory = helpers.validateCategoryForCreation(categorySubmitted);
	
	if (!validCategory) {
		response.json({message: "Error: Categoría Inválida."});
	} else {
		response.json({massage: "La categoría se creó correctamente."});
	}
}

// DELETE Requests
router.delete("/:categoryId", deleteCategory); // ./Categories/{categoryId}
function deleteCategory(request, response) {
	const { categoryId } = request.params;
	let categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.json({message: "Error: No se encontró la categoría especificada."});
	} else {
		response.json({message: "La categoría se borró correctamente.", category: categoryFound});
	}
}

// PATCH Requests

// PUT Requests

/* Export */
module.exports = router;