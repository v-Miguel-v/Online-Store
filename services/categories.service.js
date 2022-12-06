const DATA = require("../data/categories.data");
const DATA2 = require("../data/products.data");
const boom = require("@hapi/boom");

class CategoriesService {
	constructor(){
		this.categories = DATA;
		this.products = DATA2;
	}
	
	getAll(){
		return new Promise((resolve, reject) => {
			try {
				resolve(this.categories);
			} catch (error) {
				reject(error);
			}
		});
	}
	
	search(givenId){
		return new Promise((resolve, reject) => {
			try {
				const categoryFound = this.categories.find(category => category.id === givenId);
				if (!categoryFound) {
					throw boom.notFound("No se encontró la categoría especificada.");
				} else {
					resolve(categoryFound);
				}
			} catch (error) {
				reject(error);
			}
		});
	}
	
	getProducts(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				const category = await this.search(givenId);
				const categoryProducts = this.products.filter(product => product.category === category.name);
				resolve(categoryProducts);
			} catch (error) {
				reject(error);
			}
		});
	}
	
	searchProduct(categoryId, productId){
		return new Promise(async (resolve, reject) => {
			try {
				const categoryProducts = await this.getProducts(categoryId);
				const productFound = categoryProducts.find(product => product.id === productId);
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
	
	create(givenCategory){
		return new Promise((resolve, reject) => {
			try {
				const thereAreCategories = this.categories.length > 0;
				let newId = null;
				if (thereAreCategories) {
					const lastIndex = this.categories.length - 1;
					const lastId = Number(this.categories[lastIndex].id);
					newId = String(lastId+1);
				}
				if (!thereAreCategories) {
					newId = "0";
				}
				const newCategory = {id: newId, ...givenCategory};
				this.categories.push(newCategory);
				resolve(newCategory);
			} catch (error) {
				reject(error);
			}
		});
	}
	
	delete(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				await this.search(givenId);
				const index = this.categories.findIndex(category => category.id === givenId);
				const deletedCategory = this.categories[index];
				this.categories.splice(index, 1);
				resolve(deletedCategory);
			} catch (error) {
				reject(error);
			}
		});
	}
	
	update(givenId, givenUpdate){
		return new Promise(async (resolve, reject) => {
			try {
				await this.search(givenId);
				const category = this.categories.find(category => category.id === givenId);
				const index = this.categories.findIndex(category => category.id === givenId);
				this.categories[index] = { ...category, ...givenUpdate };
				const updatedCategory = this.categories[index];
				resolve(updatedCategory);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = CategoriesService;