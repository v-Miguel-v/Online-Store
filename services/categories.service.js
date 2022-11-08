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
		// próximamente
	}
	
	delete(givenId){
		// próximamente
	}
	
	simpleUpdate(givenCategory){
		// próximamente
	}
	
	fullUpdate(givenCategory){
		// próximamente
	}
}

module.exports = CategoriesService;