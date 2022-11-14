const DATA = require("../data/categories.data");
const CATEGORIES_KEYS_LENGTH = 1;

class CategoriesService {
	constructor(){
		this.categories = DATA;
	}
	
	getAll(){
		return this.categories;
	}
	
	search(givenId){
		return this.categories.find(category => category.id === givenId);
	}
	
	validate(givenCategory, validationType){
		try {
			if (validationType === "full validation") {
				const hasNameKey = Object.keys(givenCategory)[0] === "name";
				const hasCorrectNumberOfKeys = Object.keys(givenCategory).length === CATEGORIES_KEYS_LENGTH;
					const validKeys = hasNameKey && hasCorrectNumberOfKeys;
				
				const hasStringInName = typeof(givenCategory.name) === "string" && givenCategory.name.length > 0;
					const validValues = hasStringInName;
				
				const validationResult = validKeys && validValues;
				return validationResult;
			}
			
			else if (validationType === "simple validation") {
				const hasNameKey = Object.keys(givenCategory).includes("name");
					let hasAnotherKey = null;
						Object.keys(givenCategory).forEach(key => {
							if ( (key !== "name") ) {
								hasAnotherKey = true;
							}
						});
				const hasCorrectNumberOfKeys = Object.keys(givenCategory).length < CATEGORIES_KEYS_LENGTH;
				const validKeys = ( (hasNameKey) && hasCorrectNumberOfKeys && !hasAnotherKey );
				
				const hasStringInName = typeof(givenCategory.name) === "string" && givenCategory.name.length > 0;
					const validValues = true;
						if (hasNameKey) if (!hasStringInName) validValues = false;
				
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
	
	create(givenCategory){
		const lastIndex = this.categories.length - 1;
		const lastId = Number(this.categories[lastIndex].id);
		const newId = String(lastId+1);
		const newCategory = {id: newId, ...givenCategory};
		this.categories.push(newCategory);
		return newCategory;
	}
	
	delete(givenId){
		const index = this.categories.findIndex(category => category.id === givenId);
		this.categories.splice(index, 1);
	}
	
	simpleUpdate(givenId, givenUpdate){
		const category = this.categories.find(category => category.id === givenId);
		const index = this.categories.findIndex(category => category.id === givenId);
		this.categories[index] = { ...category, ...givenUpdate };
	}
	
	fullUpdate(givenId, givenUpdate){
		const category = this.categories.find(category => category.id === givenId);
		const index = this.categories.findIndex(category => category.id === givenId);
		this.categories[index] = { ...category, ...givenUpdate };
	}
}

module.exports = CategoriesService;