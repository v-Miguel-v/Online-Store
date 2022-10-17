const usersRouter = require("./users.router");
const productsRouter = require("./products.router");
const categoriesRouter = require("./categories.router");

function routerApi(app) {
	app.use("/users", usersRouter);
	app.use("/products", productsRouter);
	app.use("/categories", categoriesRouter);
}

module.exports = routerApi;