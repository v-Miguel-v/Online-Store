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
	const productFound = helpers.searchInDataById(productId, DATA.products);
	
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
	const validProduct = helpers.validateProductInformation(productSubmitted, "full validation");
	
	if (!validProduct) {
		response.json({message: "Error: Producto Inválido."});
	} else {
		response.json({massage: "El producto se creó correctamente.", productCreated: productSubmitted});
	}
}

// DELETE Requests
router.delete("/:productId", deleteProduct); // ./Products/{productId}
function deleteProduct(request, response) {
	const { productId } = request.params;
	const productFound = helpers.searchInDataById(productId, DATA.products);
	
	if (!productFound) {
		response.json({message: "Error: No se encontró el producto especificado."});
	} else {
		response.json({message: "El producto se borró correctamente.", productDeleted: productFound});
		// Probablemente aquí haya un error en la parte de la categoría.
	}
}

// PATCH Requests
router.patch("/:productId", simpleUpdateProduct); // ./Products/{id}
function simpleUpdateProduct(request, response) {
	const { productId } = request.params;
	const productFound = helpers.searchInDataById(productId, DATA.products);
	
	if (!productFound) {
		response.json({message: "Error: No se encontró el producto especificado"});
	} else {
		const updateInfo = request.body;
		const validInfo = helpers.validateProductInformation(updateInfo, "simple validation");
		
		if (validInfo) {
			response.json({
				massage: "El producto se actualizó correctamente.",
				productBefore: productFound,
				productAfter: {...productFound, ...updateInfo} // Probablemente aquí haya un error en la parte de la categoría.
			});
		} else {
			response.json({message: "Error: Los datos proporcionados para la actualización son incorrectos."});
		}
	}
}

// PUT Requests
router.put("/:productId", fullUpdateProduct); // ./Products/{id}
function fullUpdateProduct(request, response) {
	const { productId } = request.params;
	const productFound = helpers.searchInDataById(productId, DATA.products);
	
	if (!productFound) {
		response.json({message: "Error: No se encontró el producto especificado"});
	} else {
		const updateInfo = request.body;
		const validInfo = helpers.validateProductInformation(updateInfo, "full validation");
		
		if (validInfo) {
			response.json({
				massage: "El producto se actualizó correctamente.",
				productBefore: productFound,
				productAfter: {...productFound, ...updateInfo} // Probablemente aquí haya un error en la parte de la categoría.
			});
		} else {
			response.json({message: "Error: Los datos proporcionados para la actualización son incorrectos."});
		}
	}
}


/* Export */
module.exports = router;