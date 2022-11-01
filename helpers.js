const USERS_KEYS_LENGTH = 2;
const PRODUCTS_KEYS_LENGTH = 3;
const CATEGORIES_KEYS_LENGTH = 1;

const helpers = {	
	searchInDataById(itemId, data) {
		let itemFound = null;
		itemId = Number(itemId);
		data.forEach(item => {if (item.id === itemId) itemFound = item});
		return itemFound;
	},
	
	/* Validation for Creations and Full Updates */
	validateUserInformation(user, validationType) {
		try {
			if (validationType === "full validation") {
				const hasNameKey = Object.keys(user)[0] === "name";
				const hasAgeKey = Object.keys(user)[1] === "age";
				const hasCorrectNumberOfKeys = Object.keys(user).length === USERS_KEYS_LENGTH;
					const validKeys = hasNameKey && hasAgeKey && hasCorrectNumberOfKeys;
				
				const hasStringInName = typeof(user.name) === "string" && user.name.length > 0;
				const hasNumberInAge = typeof(user.age) === "number" && user.age > 0;
					const validValues = hasStringInName && hasNumberInAge;
				
				const validationResult = validKeys && validValues;
				return validationResult;
			}
			
			else if (validationType === "simple validation") {
				const hasNameKey = Object.keys(user).includes("name");
				const hasAgeKey = Object.keys(user).includes("age");
				let hasAnotherKey = null;
					Object.keys(user).forEach(key => {
						if ( (key !== "name") && (key !== "age") ) {
							hasAnotherKey = true;
						}
					});
				const hasCorrectNumberOfKeys = Object.keys(user).length < USERS_KEYS_LENGTH;
				const validKeys = (hasNameKey || hasAgeKey) && hasCorrectNumberOfKeys && !hasAnotherKey;
				
				const hasStringInName = typeof(user.name) === "string" && user.name.length > 0;
				const hasNumberInAge = typeof(user.age) === "number" && user.age > 0;
					const validValues = true;
						if (hasNameKey) if (!hasStringInName) validValues = false;
						if (hasAgeKey) if (!hasNumberInAge) validValues = false;
				
				const validationResult = validKeys && validValues;
				return validationResult;
			}
			
			else {
				return false;
			}
		} catch {
			return false;
		}
	},
	
	validateCategoryInformation(category, validationType) {
		try {
			if (validationType === "full validation") {
				const hasNameKey = Object.keys(category)[0] === "name";
				const hasCorrectNumberOfKeys = Object.keys(category).length === CATEGORIES_KEYS_LENGTH;
					const validKeys = hasNameKey && hasCorrectNumberOfKeys;
				
				const hasStringInName = typeof(category.name) === "string" && category.name.length > 0;
					const validValues = hasStringInName;
				
				const validationResult = validKeys && validValues;
				return validationResult;
			}
			
			else if (validationType === "simple validation") {
				const hasNameKey = Object.keys(category).includes("name");
					let hasAnotherKey = null;
						Object.keys(category).forEach(key => {
							if ( (key !== "name") ) {
								hasAnotherKey = true;
							}
						});
				const hasCorrectNumberOfKeys = Object.keys(category).length < CATEGORIES_KEYS_LENGTH;
				const validKeys = ( (hasNameKey) && hasCorrectNumberOfKeys && !hasAnotherKey );
				
				const hasStringInName = typeof(category.name) === "string" && category.name.length > 0;
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
	},
	
	validateProductInformation(product, validationType) {
		try {
			if (validationType === "full validation") {
				const hasNameKey = Object.keys(product)[0] === "name";
				const hasPriceKey = Object.keys(product)[1] === "price";
				const hasCategoryKey = Object.keys(product)[2] === "category";
				const hasCorrectNumberOfKeys = Object.keys(product).length === PRODUCTS_KEYS_LENGTH;
					const validKeys = hasNameKey && hasCorrectNumberOfKeys;
				
				const hasStringInName = typeof(product.name) === "string" && product.name.length > 0;
				const hasNumberInPrice = typeof(product.price) === "number" && product.price > 0;
				const hasNumberInCategory = typeof(product.category) === "number";
					const validValues = hasStringInName && hasNumberInPrice && hasNumberInCategory;
				
				const validationResult = validKeys && validValues;
				return validationResult;
			}
			
			else if (validationType === "simple validation") {				
				const hasNameKey = Object.keys(product).includes("name");
				const hasPriceKey = Object.keys(product).includes("price");
				const hasCategoryKey = Object.keys(product).includes("category");
					let hasAnotherKey = null;
						Object.keys(product).forEach(key => {
							if ( (key !== "name") && (key !== "price") && (key !== "category") ) {
								hasAnotherKey = true;
							}
						});
				const hasCorrectNumberOfKeys = Object.keys(product).length < PRODUCTS_KEYS_LENGTH;
				const validKeys = (
					(hasNameKey || hasPriceKey || hasCategoryKey) && hasCorrectNumberOfKeys && !hasAnotherKey
				);
				
				const hasStringInName = typeof(product.name) === "string" && product.name.length > 0;
				const hasNumberInPrice = typeof(product.price) === "number" && product.price > 0;
				const hasNumberInCategory = typeof(product.category) === "number";
					const validValues = true;
						if (hasNameKey) if (!hasStringInName) validValues = false;
						if (hasPriceKey) if (!hasNumberInPrice) validValues = false;
						if (hasCategoryKey) if (!hasNumberInCategory) validValues = false;
				
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
}

module.exports = helpers;