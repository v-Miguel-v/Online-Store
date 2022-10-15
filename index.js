/* Initial & Global Values */
const DATA = require("./data.js");
const express = require("express");
const app = express();
const port = 3000;

/* Helpers */
function searchInDataById(itemId, data) {
	let itemFound = null;
	itemId = Number(itemId);
	
	data.forEach(item => {if (item.id === itemId) itemFound = item});
	return itemFound;
}

/* HTTP Requests */
// GET Requests
app.get("/", getMainPage);
app.get("/example-route", getExampleRoutePage);
app.listen(port, () => { console.log(`El servidor está corriendo en el puerto ${port}`); });

app.get("/users", getUsers);
	app.get("/users/:userId", getUserById);
	
app.get("/products", getProducts);
	app.get("/products/:productId", getProductById);
	
app.get("/categories", getCategories);
	app.get("/categories/:categoryId", getCategoryById);
	app.get("/categories/:categoryId/products", getProductsByCategory);
	app.get("/categories/:categoryId/products/:productId", getProductByIdFromCategory);


/* PÁGINAS */
// Página Principal
function getMainPage(request, response) {
	response.send(`
		<h1>Servidor de Prueba</h1>
		<p>El servidor se ha creado satisfactoriamente usando <i>express</i>.</p>
		<p>Justo ahora no estás en ninguna ruta en concreto, <b>te encuentras en la página principal</b>.</p>
		<br>
		<p><u>Prueba a acceder a las siguientes rutas:</u></p>
		<ul>
			<li><a href="http://localhost:3000/users">Users</a></li>
			<li><a href="http://localhost:3000/products">Products</a></li>
			<li><a href="http://localhost:3000/categories">Categories</a></li>
			<li><a href="http://localhost:3000/example-route">Example Route</a></li>
		</ul>
	`);
}

// Ruta de Ejemplo
function getExampleRoutePage(request, response) {
	response.send(`
		<h1>Servidor de Prueba</h1>
		<p>Ahora te encuentras en <b>la ruta de ejemplo</b>.</p>
		<p><a href="http://localhost:3000">Regresar a la Página Principal</a></p>
	`);	
}

/* END POINTS */
// ./Users
function getUsers(request, response) { response.json(DATA.users); }

// ./Users/{id}
function getUserById(request, response) {
	const { userId } = request.params;
	let userFound = searchInDataById(userId, DATA.users);
	
	if (!userFound) {
		response.send("No se encontró la información solicitada");
	} else {
		response.json(userFound);
	}
}

// ./Products
function getProducts(request, response) { response.json(DATA.products); }

// ./Products/{productId}
function getProductById(request, response) {
	const { productId } = request.params;
	let productFound = searchInDataById(productId, DATA.products);
	
	if (!productFound) {
		response.send("No se encontró la información solicitada");
	} else {
		response.json(productFound);
	}
}

// ./Categories
function getCategories(request, response) { response.json(DATA.categories); }

// ./Categories/{categoryId}
function getCategoryById(request, response) {
	const { categoryId } = request.params;
	let categoryFound = searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.send("No se encontró la información solicitada");
	} else {
		response.json(categoryFound);
	}
}

// ./Categories/{categoryId}/products
function getProductsByCategory(request, response) {
	const { categoryId } = request.params;
	let categoryFound = searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.send("No se encontró la información solicitada");
	} else {
		response.json(DATA.products.filter(product => product.category.id === categoryFound.id));
	}
}

// ./Categories/{categoryId}/products/{productId}
function getProductByIdFromCategory(request, response) {
	const { categoryId, productId } = request.params;
	let categoryFound = searchInDataById(categoryId, DATA.categories);
	
	if (!categoryFound) {
		response.send("No se encontró la información solicitada");
	} else {
		const categoryProducts = DATA.products.filter(product => product.category.id === categoryFound.id);
		let productFound = searchInDataById(productId, categoryProducts);
		
		if (productFound) {
			response.json(productFound);
		} else {
			response.send("No se encontró la información solicitada");
		}
	}
}