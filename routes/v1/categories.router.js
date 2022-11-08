/* Instances Initialization */
const CategoriesService = require("../../services/categories.service");
const ProductsService = require("../../services/products.service");
	const service = new CategoriesService();
	const products = new ProductsService();

const express = require("express");
	const router = express.Router();

// GET Requests
router.get("/", getCategories); // ./Categories
function getCategories(request, response) {
	const allCategories = service.getAll();
	response.json(allCategories);
}

// ./Categories/{categoryId}
router.get("/:categoryId", getCategoryById);
function getCategoryById(request, response) {
	const { categoryId } = request.params;
	const categoryFound = service.search(categoryId);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la información solicitada."});
	} else {
		response.status(200).json(categoryFound);
	}
}

// ./Categories/{categoryId}/products
router.get("/:categoryId/products", getProductsByCategory);
function getProductsByCategory(request, response) {
	const { categoryId } = request.params;
	const categoryFound = service.search(categoryId);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la información solicitada."});
	} else {
		const allProducts = products.getAll();
		response.status(200).json(allProducts.filter(product => product.category.id === categoryId));
	}
}

// ./Categories/{categoryId}/products/{productId}
router.get("/:categoryId/products/:productId", getProductByIdFromCategory);
function getProductByIdFromCategory(request, response) {
	const { categoryId, productId } = request.params;
	const categoryFound = service.search(categoryId);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la información solicitada."});
	} else {
		const AllProducts = products.getAll();
		const categoryProducts = AllProducts.filter(product => product.category.id === categoryId);
		const productFound = categoryProducts.find(product => product.id === productId);
		
		if (productFound) {
			response.status(200).json(productFound);
		} else {
			response.status(404).json({message: "Error: No se encontró la información solicitada."});
		}
	}
}

// POST Requests
router.post("/", createCategory); // ./Categories
function createCategory(request, response) {
	const givenCategory = request.body;
	const validCategory = service.validate(givenCategory, "full validation");
	
	if (!validCategory) {
		response.status(400).json({message: "Error: Categoría Inválida."});
	} else {
		// const newCategory = service.create(givenCategory);
		response.status(201).json({massage: "La categoría se creó correctamente.", categoryCreated: givenCategory});
	}
}

// DELETE Requests
router.delete("/:categoryId", deleteCategory); // ./Categories/{categoryId}
function deleteCategory(request, response) {
	const { categoryId } = request.params;
	const categoryFound = service.search(categoryId);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la categoría especificada."});
	} else {
		// service.delete(categoryId);
		response.status(200).json({message: "La categoría se borró correctamente.", categoryDeleted: categoryFound});
	}
}

// PATCH Requests
router.patch("/:categoryId", simpleUpdateCategory); // ./Categories/{id}
function simpleUpdateCategory(request, response) {
	const { categoryId } = request.params;
	const categoryFound = service.search(categoryId);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la categoría especificada."});
	} else {
		const updateInfo = request.body;
		const validInfo = service.validate(updateInfo, "simple validation");;
		
		if (validInfo) {
			// service.simpleUpdate(categoryId, updateInfo);
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
	const categoryFound = service.search(categoryId);
	
	if (!categoryFound) {
		response.status(404).json({message: "Error: No se encontró la categoría especificada."});
	} else {
		const updateInfo = request.body;
		const validInfo = service.validate(updateInfo, "full validation");
		
		if (validInfo) {
			// service.fullUpdate(categoryId, updateInfo);
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