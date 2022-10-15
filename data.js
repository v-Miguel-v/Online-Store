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

// Users
const users = [
	new User(0, "Miguel", 22),
	new User(1, "Luis", 25),
	new User(2, "Gabriela", 32),
	new User(3, "Alondra", 19),
	new User(4, "Mike", 18),
	new User(5, "Rafael", 40),
	new User(6, "Oriana", 20),
	new User(7, "Ania", 31)
];

// Categories
const clothing = new Category(0, "Clothing");
const sports = new Category(1, "Sports");
const cleaning = new Category(2, "Cleaning");
const appliances = new Category(3, "Appliances");
const furniture = new Category(4, "Furniture");
const random = new Category(5, "Random");

const categories = [ clothing, sports, cleaning, appliances, furniture, random ];

// Products
const products = [
	new Product(0, "T-Shirt", 205, clothing),
	new Product(1, "Jeans", 210, clothing),
	new Product(2, "Cool Shoes", 800, clothing),
	new Product(3, "Hat", 70, clothing),
	
	new Product(4, "Soccer Ball", 510, sports),
	new Product(5, "Tennis Racquet", 130, sports),
	new Product(6, "Boxing Gloves", 650, sports),
	new Product(7, "Bicycle", 1800, sports),
	
	new Product(8, "Disinfectant", 150, cleaning),
	new Product(9, "Chlorine", 120, cleaning),
	new Product(10, "Soap", 15, cleaning),
	new Product(11, "Sponge", 8, cleaning),
	
	new Product(12, "Microwave", 1000, appliances),
	new Product(13, "Refrigerator", 2990, appliances),
	new Product(14, "Toaster", 770, appliances),
	new Product(15, "Washing Machine", 2500, appliances),
	
	new Product(16, "Sofa", 890, furniture),
	new Product(17, "Bed", 900, furniture),
	new Product(18, "Table", 500, furniture),
	new Product(19, "Chair", 130, furniture),
	
	new Product(20, "Pensaste que era un producto cualquiera de la API, pero era yo: ¡DIO!", 710, random)
];

// ALL DATA
const DATA = {
	users: [...users],
	products: [...products],
	categories: [...categories]
}

module.exports = DATA;