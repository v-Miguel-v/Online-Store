const DATA = require("./data.js");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", getMainPage);
app.get("/example-route", getExampleRoutePage);
app.listen(port, () => { console.log(`El servidor está corriendo en el puerto ${port}`); });

app.get("/users", getUsers);
//	app.get("/users/:userId", getUserById);
	
app.get("/products", getProducts);
//	app.get("/products/:productId", getProductById);
	
app.get("/categories", getCategories);
//	app.get("/categories/:categoryId", getCategoryById);
//	app.get("/categories/:categoryId/products", getProductsByCategory);
//	app.get("/categories/:categoryId/products/:productId", getProductByIdFromCategory);
	
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

function getUsers(request, response) { response.json(DATA.users); } // Users
function getProducts(request, response) { response.json(DATA.products); } // Products
function getCategories(request, response) { response.json(DATA.categories); } // Categories