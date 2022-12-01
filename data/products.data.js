// File System Module

/*
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
*/

const products = [
	{id:"0",name:"T-Shirt",price:205,category:{id:"0",name:"Clothing"}},
	{id:"1",name:"Jeans",price:210,category:{id:"0",name:"Clothing"}},
	{id:"2",name:"Cool Shoes",price:800,category:{id:"0",name:"Clothing"}},
	{id:"3",name:"Hat",price:70,category:{id:"0",name:"Clothing"}},
	{id:"4",name:"Soccer Ball",price:510,category:{id:"1",name:"Sports"}},
	{id:"5",name:"Tennis Racquet",price:130,category:{id:"1",name:"Sports"}},
	{id:"6",name:"Boxing Gloves",price:650,category:{id:"1",name:"Sports"}},
	{id:"7",name:"Bicycle",price:1800,category:{id:"1",name:"Sports"}},
	{id:"8",name:"Disinfectant",price:150,category:{id:"2",name:"Cleaning"}},
	{id:"9",name:"Chlorine",price:120,category:{id:"2",name:"Cleaning"}},
	{id:"10",name:"Soap",price:15,category:{id:"2",name:"Cleaning"}},
	{id:"11",name:"Sponge",price:8,category:{id:"2",name:"Cleaning"}},
	{id:"12",name:"Microwave",price:1000,category:{id:"3",name:"Appliances"}},
	{id:"13",name:"Refrigerator",price:2990,category:{id:"3",name:"Appliances"}},
	{id:"14",name:"Toaster",price:770,category:{id:"3",name:"Appliances"}},
	{id:"15",name:"Washing Machine",price:2500,category:{id:"3",name:"Appliances"}},
	{id:"16",name:"Sofa",price:890,category:{id:"4",name:"Furniture"}},
	{id:"17",name:"Bed",price:900,category:{id:"4",name:"Furniture"}},
	{id:"18",name:"Table",price:500,category:{id:"4",name:"Furniture"}},
	{id:"19",name:"Chair",price:130,category:{id:"4",name:"Furniture"}},
	{id:"20",name:"¡DIO!",price:710,category:{id:"5",name:"Random"}}
];

console.group("Products:");
	console.table(products);
console.groupEnd("Products:");

module.exports = products;