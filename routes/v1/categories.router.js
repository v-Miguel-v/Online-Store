/* Instances Initialization */
const CategoriesService = require("../../services/categories.service");
	const service = new CategoriesService();

const express = require("express");
	const router = express.Router();
	
const validationHandler = require("../../middlewares/validation.handler");
	const { fullValidationSchema, simpleValidationSchema, idValidationSchema, twoIdsValidationSchema } = require("../../schemas/categories.schema");

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

// ./Categories/{id}
router.get("/:id", validationHandler(idValidationSchema, "params"), getCategoryById);
async function getCategoryById(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const categoryFound = await service.search(id);
		response.status(200).json(categoryFound);
	} catch (error) {
		errorHandlers(error);
	}
}

// ./Categories/{id}/products
router.get("/:id/products", validationHandler(idValidationSchema, "params"), getProductsByCategory);
async function getProductsByCategory(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const categoryProducts = await service.getProducts(id);
		response.status(200).json(categoryProducts);
	} catch (error) {
		errorHandlers(error);
	}
}

// ./Categories/{categoryId}/products/{productId}
router.get("/:categoryId/products/:productId", validationHandler(twoIdsValidationSchema, "params"), getProductByIdFromCategory);
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
router.post("/", validationHandler(fullValidationSchema, "body"), createCategory); // ./Categories
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
router.delete("/:id", validationHandler(idValidationSchema, "params"), deleteCategory); // ./Categories/{id}
async function deleteCategory(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const categoryDeleted = await service.delete(id);
		response.status(200).json({message: "La categoría se borró correctamente.", categoryDeleted});
	} catch (error) {
		errorHandlers(error);
	}
}

// PATCH Requests
router.patch("/:id",
	validationHandler(idValidationSchema, "params"),
	validationHandler(simpleValidationSchema, "body"),
simpleUpdateCategory); // ./Categories/{id}
async function simpleUpdateCategory(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const updateInfo = request.body;
		const originalCategory = await service.search(id);
		const categoryUpdated = await service.update(id, updateInfo, "simple update");
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
router.put("/:id",
	validationHandler(idValidationSchema, "params"),
	validationHandler(fullValidationSchema, "body"),
fullUpdateCategory); // ./Categories/{id}
async function fullUpdateCategory(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const updateInfo = request.body;
		const originalCategory = await service.search(id);
		const categoryUpdated = await service.update(id, updateInfo, "full update");
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