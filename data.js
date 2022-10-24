// File System Module
const fs = require("fs");

// Data Types
class User {
	constructor(id, name, age) {
		this.id = id,
		this.name = name,
		this.age = age
	}
}

class Product {
	constructor(id, name, price, category) {
		this.id = id,
		this.name = name,
		this.price = price,
		this.category = category
	}
}

class Category {
	constructor(id, name) {
		this.id = id,
		this.name = name
	}
}

// Register
function readRegister(path) {
	try {
		console.log("Leyendo registros");
		return fs.readFileSync(path, "utf-8");
	} catch (error) {
		console.error(error);
		return null;
	}
}

// Parser
function parseData(data) {
	let usersParsed = null;
	if (data) {
		const usersUnparsed = data.split("\r\n");
		usersParsed = usersUnparsed.map(user => JSON.parse(user));
	}
	return usersParsed;
}

// Users
const users = [];
const usersUnparsedData = readRegister("./data/users.data.txt");
const usersParsedData = parseData(usersUnparsedData);
usersParsedData.forEach(user => users.push(new User(user.id, user.name, user.age)));
console.group("Users:");
	console.table(users);
console.groupEnd("Users:");

// Categories
const categories = [];
const categoriesUnparsedData = readRegister("./data/categories.data.txt");
const categoriesParsedData = parseData(categoriesUnparsedData);
categoriesParsedData.forEach(category => categories.push(new Category(category.id, category.name)));
console.group("Categories:");
	console.table(categories);
console.groupEnd("Categories:");

// Products
const products = [];
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

// ALL DATA
const DATA = {
	users: [...users],
	products: [...products],
	categories: [...categories]
}

module.exports = DATA;