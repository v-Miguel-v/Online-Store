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

// Categories
class Category {
	constructor(id, name) {
		this.id = id;
		this.name = name;
	}
}

const categories = [];
const categoriesUnparsedData = readRegister("./data/categories.data.txt");
const categoriesParsedData = parseData(categoriesUnparsedData);
categoriesParsedData.forEach(category => categories.push(new Category(category.id, category.name)));
console.group("Categories:");
	console.table(categories);
console.groupEnd("Categories:");

module.exports = categories;