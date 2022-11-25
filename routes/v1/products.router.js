/* Instances Initialization */
const ProductsService = require("../../services/products.service");
	const service = new ProductsService();

const express = require("express");
	const router = express.Router();

const validationHandler = require("../../middlewares/validation.handler");
	const { fullValidationSchema, simpleValidationSchema, idValidationSchema } = require("../../schemas/products.schema");

// GET Requests
router.get("/", getProducts); // ./Products
async function getProducts(request, response, errorHandlers) {
	try {
		const allProducts = await service.getAll();
		response.status(200).json(allProducts);
	} catch (error) {
		errorHandlers(error);
	}
}

// ./Products/{id}
router.get("/:id", validationHandler(idValidationSchema, "params"), getProductById);
async function getProductById(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const productFound = await service.search(id);
		response.status(200).json(productFound);
	} catch (error) {
		errorHandlers(error);
	}
}

// POST Requests
router.post("/", validationHandler(fullValidationSchema, "body"), createProduct); // ./Products
async function createProduct(request, response, errorHandlers) {
	try {
		const givenProduct = request.body;
		const newProduct = await service.create(givenProduct);
		response.status(201).json({massage: "El producto se creó correctamente.", productCreated: newProduct});
	} catch (error) {
		errorHandlers(error);
	}
}

// DELETE Requests
router.delete("/:id", validationHandler(idValidationSchema, "params"), deleteProduct); // ./Products/{id}
async function deleteProduct(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const productDeleted = await service.delete(id);
		response.status(200).json({message: "El producto se borró correctamente.", productDeleted});
	} catch (error) {
		errorHandlers(error);
	}
}

// PATCH Requests
router.patch("/:id",
	validationHandler(idValidationSchema, "params"),
	validationHandler(simpleValidationSchema, "body"),
simpleUpdateProduct); // ./Products/{id}
async function simpleUpdateProduct(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const updateInfo = request.body;
		const originalProduct = await service.search(id);
		const productUpdated = await service.update(id, updateInfo);
		response.status(200).json({
			massage: "El producto se actualizó correctamente.",
			productBefore: originalProduct,
			productAfter: productUpdated // Probablemente aquí haya un error en la parte de la categoría.
		});
	} catch (error) {
		errorHandlers(error);
	}
}

// PUT Requests
router.put("/:id",
	validationHandler(idValidationSchema, "params"),
	validationHandler(fullValidationSchema, "body"),
fullUpdateProduct); // ./Products/{id}
async function fullUpdateProduct(request, response, errorHandlers) {
	try {
		const { id } = request.params;
		const updateInfo = request.body;
		const originalProduct = await service.search(id);
		const productUpdated = await service.update(id, updateInfo);
		response.status(200).json({
			massage: "El producto se actualizó correctamente.",
			productBefore: originalProduct,
			productAfter: productUpdated // Probablemente aquí haya un error en la parte de la categoría.
		});
	} catch (error) {
		errorHandlers(error);
	}
}

/* Export */
module.exports = router;