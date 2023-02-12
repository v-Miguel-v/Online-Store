/* Initial & Global Values */
const { logErrors, boomErrorHandler, serverErrorHandler } = require("./middlewares/error.handler");
const currentProtocol = process.env.PROTOCOL || "http";
const port = process.env.PORT || 3000;
const routerApi = require("./routes");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

/* Cross Origins */
app.use(cors());

/* Routing */
routerApi(app);
app.listen(port, () => { console.log(`El servidor está corriendo en el puerto ${port}`); });

/* Middlewares & Handlers */
app.use(logErrors);
app.use(boomErrorHandler);
app.use(serverErrorHandler);

/* Pages */
// Main Page
app.get("/", getMainPage);
function getMainPage(request, response) {
	const homeUrl = `${currentProtocol}://${request.get("host")}`;
	
	response.send(`
		<h1>Servidor de Prueba</h1>
		<p>El servidor se ha creado satisfactoriamente usando <i>express</i>.</p>
		<p>Justo ahora no estás en ninguna ruta en concreto, te encuentras en <b>la página principal</b>.</p>
		<p>Enlace a la documentación: <a href="https://github.com/v-Miguel-v/Online-Store-API#readme">Documentación de la API</a></p>
		<br>
		<p><u>Prueba a acceder a las siguientes rutas:</u></p>
		<ul>
			<li><a href="${homeUrl}/api/v1/users">Users</a></li>
			<li><a href="${homeUrl}/api/v1/products">Products</a></li>
			<li><a href="${homeUrl}/api/v1/categories">Categories</a></li>
			<li><a href="${homeUrl}/example-route">Example Route</a></li>
		</ul>
	`);
}

// Example Route
app.get("/example-route", getExampleRoutePage); 
function getExampleRoutePage(request, response) {
	const homeUrl = `${currentProtocol}://${request.get("host")}`;
	
	response.send(`
		<h1>Servidor de Prueba</h1>
		<p>Ahora te encuentras en <b>la ruta de ejemplo</b>.</p>
		<p><a href="${homeUrl}">Regresar a la Página Principal</a></p>
	`);	
}