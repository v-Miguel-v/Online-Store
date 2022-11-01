const DATA = require("../../data");
const helpers = require("../../helpers");
const express = require("express");
const router = express.Router();

/* HTTP Requests */

// GET Requests
router.get("/", getCategories); // ./Categories
function getCategories(request, response) {
	response.status(200).json(DATA.categories);
}

// ./Categories/{categoryId}
router.get("/:categoryId", getCategoryById);
function getCategoryById(request, response) {
	const { categoryId } = request.params;
	const categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la información solicitada"});
	} else {
		response.status(200).json(categoryFound);
	}
}

// ./Categories/{categoryId}/products
router.get("/:categoryId/products", getProductsByCategory);
function getProductsByCategory(request, response) {
	const { categoryId } = request.params;
	const categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la información solicitada"});
	} else {
		response.status(200).json(DATA.products.filter(product => product.category.id === categoryFound.id));
	}
}

// ./Categories/{categoryId}/products/{productId}
router.get("/:categoryId/products/:productId", getProductByIdFromCategory);
function getProductByIdFromCategory(request, response) {
	const { categoryId, productId } = request.params;
	const categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la información solicitada"});
	} else {
		const categoryProducts = DATA.products.filter(product => product.category.id === categoryFound.id);
		let productFound = helpers.searchInDataById(productId, categoryProducts);
		
		if (productFound) {
			response.status(200).json(productFound);
		} else {
			response.status(404).json({message: "Error: No se encontró la información solicitada"});
		}
	}
}

// POST Requests
router.post("/", createCategory); // ./Categories
function createCategory(request, response) {
	const categorySubmitted = request.body;
	const validCategory = helpers.validateCategoryInformation(categorySubmitted, "full validation");
	
	if (!validCategory) {
		response.status(400).json({message: "Error: Categoría Inválida."});
	} else {
		response.status(201).json({massage: "La categoría se creó correctamente.", categoryCreated: categorySubmitted});
	}
}

// DELETE Requests
router.delete("/:categoryId", deleteCategory); // ./Categories/{categoryId}
function deleteCategory(request, response) {
	const { categoryId } = request.params;
	const categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la categoría especificada."});
	} else {
		response.status(200).json({message: "La categoría se borró correctamente.", categoryDeleted: categoryFound});
	}
}

// PATCH Requests
router.patch("/:categoryId", simpleUpdateCategory); // ./Categories/{id}
function simpleUpdateCategory(request, response) {
	const { categoryId } = request.params;
	const categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la categoría especificada"});
	} else {
		const updateInfo = request.body;
		const validInfo = helpers.validateCategoryInformation(updateInfo, "simple validation");;
		
		if (validInfo) {
			response.status(200).json({
				massage: "La categoría se actualizó correctamente.",
				categoryBefore: categoryFound,
				categoryAfter: {...categoryFound, ...updateInfo}
			});
		} else {
			response.status(400).json({message: "Error: Los datos proporcionados para la actualización son incorrectos."});
		}
	}
}

// PUT Requests
router.put("/:categoryId", fullUpdateCategory); // ./Categories/{id}
function fullUpdateCategory(request, response) {
	const { categoryId } = request.params;
	const categoryFound = helpers.searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la categoría especificada"});
	} else {
		const updateInfo = request.body;
		const validInfo = helpers.validateCategoryInformation(updateInfo, "full validation");
		
		if (validInfo) {
			response.status(200).json({
				massage: "La categoría se actualizó correctamente.",
				categoryBefore: categoryFound,
				categoryAfter: {...categoryFound, ...updateInfo}
			});
		} else {
			response.status(400).json({message: "Error: Los datos proporcionados para la actualización son incorrectos."});
		}
	}
}


/* Export */
module.exports = router;