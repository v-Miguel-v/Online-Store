const DATA = require("../data/products.data");
const boom = require("@hapi/boom");
const PRODUCTS_KEYS_LENGTH = 3;

class ProductsService {
	constructor(){
		this.products = DATA;
	}
	
	getAll(){
		return new Promise((resolve, reject) => {
			try {
				resolve(this.products);
			} catch (error) {
				reject(error);
			}
		});
	}
	
	search(givenId){
		return new Promise((resolve, reject) => {
			try {
				const productFound = this.products.find(product => product.id === givenId);
				if (!productFound) {
					throw boom.notFound("No se encontró el producto especificado.");
				} else {
					resolve(productFound);
				}
			} catch (error) {
				reject(error);
			}
		});
	}
	
	validate(givenProduct, validationType){
		return new Promise((resolve, reject) => {
			try {
				if (validationType === "full validation") {
					const hasNameKey = Object.keys(givenProduct)[0] === "name";
					const hasPriceKey = Object.keys(givenProduct)[1] === "price";
					const hasCategoryKey = Object.keys(givenProduct)[2] === "category";
					const hasCorrectNumberOfKeys = Object.keys(givenProduct).length === PRODUCTS_KEYS_LENGTH;
						const validKeys = hasNameKey && hasCorrectNumberOfKeys;
					
					const hasStringInName = typeof(givenProduct.name) === "string" && givenProduct.name.length > 0;
					const hasNumberInPrice = typeof(givenProduct.price) === "number" && givenProduct.price > 0;
					const hasStringInCategory = typeof(givenProduct.category) === "string";
						const validValues = hasStringInName && hasNumberInPrice && hasStringInCategory;
					
					const validationResult = validKeys && validValues;
					
					if (validationResult) {
						resolve(validationResult);
					} else {
						throw boom.badRequest("Producto Inválido.");
					}
				}
				
				else if (validationType === "simple validation") {				
					const hasNameKey = Object.keys(givenProduct).includes("name");
					const hasPriceKey = Object.keys(givenProduct).includes("price");
					const hasCategoryKey = Object.keys(givenProduct).includes("category");
						let hasAnotherKey = null;
							Object.keys(givenProduct).forEach(key => {
								if ( (key !== "name") && (key !== "price") && (key !== "category") ) {
									hasAnotherKey = true;
								}
							});
					const hasCorrectNumberOfKeys = Object.keys(givenProduct).length < PRODUCTS_KEYS_LENGTH;
					const validKeys = (
						(hasNameKey || hasPriceKey || hasCategoryKey) && hasCorrectNumberOfKeys && !hasAnotherKey
					);
					
					const hasStringInName = typeof(givenProduct.name) === "string" && givenProduct.name.length > 0;
					const hasNumberInPrice = typeof(givenProduct.price) === "number" && givenProduct.price > 0;
					const hasStringInCategory = typeof(givenProduct.category) === "string";
						let validValues = true;
							if (hasNameKey) if (!hasStringInName) validValues = false;
							if (hasPriceKey) if (!hasNumberInPrice) validValues = false;
							if (hasCategoryKey) if (!hasStringInCategory) validValues = false;
					
					const validationResult = validKeys && validValues;

					if (validationResult) {
						resolve(validationResult);
					} else {
						throw boom.badRequest("Producto Inválido.");
					}
				}
				
				else {
					throw boom.internal("validationType incorrecto.");
				}
			} catch (error) {
				reject(error);
			}
		});
	}
	
	create(givenProduct){
		return new Promise(async (resolve, reject) => {
			try {
				await this.validate(givenProduct, "full validation");
				const thereAreProducts = this.products.length > 0;
				let newId = null;
				if (thereAreProducts) {
					const lastIndex = this.products.length - 1;
					const lastId = Number(this.products[lastIndex].id);
					newId = String(lastId+1);
				}
				if (!thereAreProducts) {
					newId = "0";
				}
				const newProduct = {id: newId, ...givenProduct};
				this.products.push(newProduct);				
				resolve(newProduct);
			} catch (error) {
				reject(error);
			}
		});
	}
	
	delete(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				await this.search(givenId);
				const index = this.products.findIndex(product => product.id === givenId);
				const deletedProduct = this.products[index];
				this.products.splice(index, 1);
				resolve(deletedProduct);
			} catch (error) {
				reject(error);
			}
		});
	}
	
	update(givenId, givenUpdate, updateType){
		return new Promise(async (resolve, reject) => {
			try {
				let validationType = null;
					if (updateType === "simple update") validationType = "simple validation";
					if (updateType === "full update") validationType = "full validation";
				await this.validate(givenUpdate, validationType);
				
				const product = this.products.find(product => product.id === givenId);
				const index = this.products.findIndex(product => product.id === givenId);
				this.products[index] = { ...product, ...givenUpdate };
				const updatedProduct = this.products[index];
				resolve(updatedProduct);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = ProductsService;