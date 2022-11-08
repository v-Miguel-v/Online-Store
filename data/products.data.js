// File System Module
const fs = require("fs");

function readRegister(path) {
	try {
		console.log("Leyendo registros");
		return fs.readFileSync(path, "utf-8");
	} catch (error) {
		console.error(error);
		return null;
	}
}

function parseData(data) {
	let entitiesParsed = null;
	if (data) {
		const entitiesUnparsed = data.split("\r\n");
		entitiesParsed = entitiesUnparsed.map(entity => JSON.parse(entity));
	}
	return entitiesParsed;
}

// Products
class Product {
	constructor(id, name, price, category) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.category = category;
	}
}

const products = [];
const categories = require("./categories.data");
const productsUnparsedData = readRegister("./data/products.data.txt");
const productsParsedData = parseData(productsUnparsedData);
productsParsedData.forEach(product => products.push(new Product(
	product.id,
	product.name,
	product.price,
	categories.find(category => category.id === product.category)
)));
console.group("Products:");
	console.table(products);
console.groupEnd("Products:");

module.exports = products;