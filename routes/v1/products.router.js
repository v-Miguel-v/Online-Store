/* Instances Initialization */
const ProductsService = require("../../services/products.service");
	const service = new ProductsService();

const express = require("express");
	const router = express.Router();

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

// ./Products/{productId}
router.get("/:productId", getProductById);
async function getProductById(request, response, errorHandlers) {
	try {
		const { productId } = request.params;
		const productFound = await service.search(productId);
		response.status(200).json(productFound);
	} catch (error) {
		errorHandlers(error);
	}
}

// POST Requests
router.post("/", createProduct); // ./Products
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
router.delete("/:productId", deleteProduct); // ./Products/{productId}
async function deleteProduct(request, response, errorHandlers) {
	try {
		const { productId } = request.params;
		const productDeleted = await service.delete(productId);
		response.status(200).json({message: "El producto se borró correctamente.", productDeleted});
	} catch (error) {
		errorHandlers(error);
	}
}

// PATCH Requests
router.patch("/:productId", simpleUpdateProduct); // ./Products/{id}
async function simpleUpdateProduct(request, response, errorHandlers) {
	try {
		const { productId } = request.params;
		const updateInfo = request.body;
		const originalProduct = await service.search(productId);
		const productUpdated = await service.update(productId, updateInfo, "simple update");
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
router.put("/:productId", fullUpdateProduct); // ./Products/{id}
async function fullUpdateProduct(request, response, errorHandlers) {
	try {
		const { productId } = request.params;
		const updateInfo = request.body;
		const originalProduct = await service.search(productId);
		const productUpdated = await service.update(productId, updateInfo, "full update");
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