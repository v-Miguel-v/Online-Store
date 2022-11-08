/* Instances Initialization */
const ProductsService = require("../../services/products.service");
	const service = new ProductsService();

const express = require("express");
	const router = express.Router();

// GET Requests
router.get("/", getProducts); // ./Products
function getProducts(request, response) {
	const allProducts = service.getAll();
	response.json(allProducts);
}

// ./Products/{productId}
router.get("/:productId", getProductById);
function getProductById(request, response) {
	const { productId } = request.params;
	const productFound = service.search(productId);
	
	if (!productFound) {
		response.status(404).json({message: "Error: No se encontró la información solicitada."});
	} else {
		response.status(200).json(productFound);
	}
}

// POST Requests
router.post("/", createProduct); // ./Products
function createProduct(request, response) {
	const givenProduct = request.body;
	const validProduct = service.validate(givenProduct, "full validation");
	
	if (!validProduct) {
		response.status(400).json({message: "Error: Producto Inválido."});
	} else {
		// const newProduct = service.create(givenProduct);
		response.status(201).json({massage: "El producto se creó correctamente.", productCreated: givenProduct});
	}
}

// DELETE Requests
router.delete("/:productId", deleteProduct); // ./Products/{productId}
function deleteProduct(request, response) {
	const { productId } = request.params;
	const productFound = service.search(productId);
	
	if (!productFound) {
		response.status(404).json({message: "Error: No se encontró el producto especificado."});
	} else {
		// service.delete(productId);
		response.status(200).json({message: "El producto se borró correctamente.", productDeleted: productFound});
		// Probablemente aquí haya un error en la parte de la categoría.
	}
}

// PATCH Requests
router.patch("/:productId", simpleUpdateProduct); // ./Products/{id}
function simpleUpdateProduct(request, response) {
	const { productId } = request.params;
	const productFound = service.search(productId);
	
	if (!productFound) {
		response.status(404).json({message: "Error: No se encontró el producto especificado."});
	} else {
		const updateInfo = request.body;
		const validInfo = service.validate(updateInfo, "simple validation");
		
		if (validInfo) {
			// service.simpleUpdate(productId, updateInfo);
			response.status(200).json({
				massage: "El producto se actualizó correctamente.",
				productBefore: productFound,
				productAfter: {...productFound, ...updateInfo} // Probablemente aquí haya un error en la parte de la categoría.
			});
		} else {
			response.status(400).json({message: "Error: Los datos proporcionados para la actualización son incorrectos."});
		}
	}
}

// PUT Requests
router.put("/:productId", fullUpdateProduct); // ./Products/{id}
function fullUpdateProduct(request, response) {
	const { productId } = request.params;
	const productFound = service.search(productId);
	
	if (!productFound) {
		response.status(404).json({message: "Error: No se encontró el producto especificado."});
	} else {
		const updateInfo = request.body;
		const validInfo = service.validate(updateInfo, "full validation");
		
		if (validInfo) {
			// service.fullUpdate(productId, updateInfo);
			response.status(200).json({
				massage: "El producto se actualizó correctamente.",
				productBefore: productFound,
				productAfter: {...productFound, ...updateInfo} // Probablemente aquí haya un error en la parte de la categoría.
			});
		} else {
			response.status(400).json({message: "Error: Los datos proporcionados para la actualización son incorrectos."});
		}
	}
}


/* Export */
module.exports = router;