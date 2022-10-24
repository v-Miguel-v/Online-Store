const express = require("express");
const usersRouter = require("./v1/users.router");
const productsRouter = require("./v1/products.router");
const categoriesRouter = require("./v1/categories.router");

function routerApi(app) {
	const v1 = express.Router();
	app.use("/api/v1", v1);
		v1.use("/users", usersRouter);
		v1.use("/products", productsRouter);
		v1.use("/categories", categoriesRouter);
}

module.exports = routerApi;