const DATA = require("../data/products.data");
const PRODUCTS_KEYS_LENGTH = 3;

class ProductsService {
	constructor(){
		this.products = DATA;
	}
	
	getAll(){
		return this.products;
	}
	
	search(givenId){
		return this.products.find(product => product.id === givenId);
	}
	
	validate(givenProduct, validationType){
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
				return validationResult;
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
					const validValues = true;
						if (hasNameKey) if (!hasStringInName) validValues = false;
						if (hasPriceKey) if (!hasNumberInPrice) validValues = false;
						if (hasCategoryKey) if (!hasStringInCategory) validValues = false;
				
				const validationResult = validKeys && validValues;
				return validationResult;
			}
			
			else {
				return false;
			}
		} catch {
			return false;
		}
	}
	
	create(givenProduct){
		// próximamente
	}
	
	delete(givenId){
		// próximamente
	}
	
	simpleUpdate(givenProduct){
		// próximamente
	}
	
	fullUpdate(givenProduct){
		// próximamente
	}
}

module.exports = ProductsService;