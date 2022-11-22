/* Instances Initialization */
const CategoriesService = require("../../services/categories.service");
const ProductsService = require("../../services/products.service");
	const service = new CategoriesService();
	const products = new ProductsService();

const express = require("express");
	const router = express.Router();

// GET Requests
router.get("/", getCategories); // ./Categories
async function getCategories(request, response, errorHandlers) {
	try {
		const allCategories = await service.getAll();
		response.status(200).json(allCategories);
	} catch (error) {
		errorHandlers(error);
	}
}

// ./Categories/{categoryId}
router.get("/:categoryId", getCategoryById);
async function getCategoryById(request, response, errorHandlers) {
	try {
		const { categoryId } = request.params;
		const categoryFound = await service.search(categoryId);
		response.status(200).json(categoryFound);
	} catch (error) {
		errorHandlers(error);
	}
}

// ./Categories/{categoryId}/products
router.get("/:categoryId/products", getProductsByCategory);
async function getProductsByCategory(request, response, errorHandlers) {
	try {
		const { categoryId } = request.params;
		const categoryProducts = await service.getProducts(categoryId);
		response.status(200).json(categoryProducts);
	} catch (error) {
		errorHandlers(error);
	}
}

// ./Categories/{categoryId}/products/{productId}
router.get("/:categoryId/products/:productId", getProductByIdFromCategory);
async function getProductByIdFromCategory(request, response, errorHandlers) {
	try {
		const { categoryId, productId } = request.params;
		const productFound = await service.searchProduct(categoryId, productId);
		response.status(200).json(productFound);
	} catch (error) {
		errorHandlers(error);
	}
}

// POST Requests
router.post("/", createCategory); // ./Categories
async function createCategory(request, response, errorHandlers) {
	try {
		const givenCategory = request.body;
		const newCategory = await service.create(givenCategory);
		response.status(201).json({massage: "La categoría se creó correctamente.", categoryCreated: newCategory});
	} catch (error) {
		errorHandlers(error);
	}
}

// DELETE Requests
router.delete("/:categoryId", deleteCategory); // ./Categories/{categoryId}
async function deleteCategory(request, response, errorHandlers) {
	try {
		const { categoryId } = request.params;
		const categoryDeleted = await service.delete(categoryId);
		response.status(200).json({message: "La categoría se borró correctamente.", categoryDeleted});
	} catch (error) {
		errorHandlers(error);
	}
}

// PATCH Requests
router.patch("/:categoryId", simpleUpdateCategory); // ./Categories/{id}
async function simpleUpdateCategory(request, response, errorHandlers) {
	try {
		const { categoryId } = request.params;
		const updateInfo = request.body;
		const originalCategory = await service.search(categoryId);
		const categoryUpdated = await service.update(categoryId, updateInfo, "simple update");
		response.status(200).json({
			massage: "La categoría se actualizó correctamente.",
			categoryBefore: originalCategory,
			categoryAfter: categoryUpdated
		});
	} catch (error) {
		errorHandlers(error);
	}
}

// PUT Requests
router.put("/:categoryId", fullUpdateCategory); // ./Categories/{id}
async function fullUpdateCategory(request, response, errorHandlers) {
	try {
		const { categoryId } = request.params;
		const updateInfo = request.body;
		const originalCategory = await service.search(categoryId);
		const categoryUpdated = await service.update(categoryId, updateInfo, "full update");
		response.status(200).json({
			massage: "La categoría se actualizó correctamente.",
			categoryBefore: originalCategory,
			categoryAfter: categoryUpdated
		});
	} catch (error) {
		errorHandlers(error);
	}
}

/* Export */
module.exports = router;