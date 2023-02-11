const DATA = require("../data/products.data");
const DATA2 = require("../data/categories.data");
const boom = require("@hapi/boom");

class ProductsService {
	constructor(){
		this.products = DATA;
		this.categories = DATA2;
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
	
	create(givenProduct){
		return new Promise((resolve, reject) => {
			try {
				const categoryFound = this.categories.find(category => category.id === givenProduct.category);
				if (!categoryFound) {
					throw boom.badRequest("La categoría especificada no es válida.");
				}				
				
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
				const newProduct = {id: newId, ...givenProduct, category: categoryFound.name};
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
	
	update(givenId, givenUpdate){
		return new Promise(async (resolve, reject) => {
			try {
				await this.search(givenId);
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