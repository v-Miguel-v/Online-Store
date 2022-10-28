const helpers = {
	searchInDataById(itemId, data) {
		let itemFound = null;
		itemId = Number(itemId);
		
		data.forEach(item => {if (item.id === itemId) itemFound = item});
		return itemFound;
	},
	
	validateUserForCreation(user) {
		try {
			const hasNameKey = Object.keys(user)[0] === "name";
			const hasAgeKey = Object.keys(user)[1] === "age";
			const hasOnlyTwoKeys = Object.keys(user).length === 2;
				const validKeys = hasNameKey && hasAgeKey && hasOnlyTwoKeys;
			
			const hasStringInName = typeof(user.name) === "string";
			const hasNumberInAge = typeof(user.age) === "number" && user.age > 0;
				const validValues = hasStringInName && hasNumberInAge;
			
			const validationResult = validKeys && validValues;
			return validationResult;
		} catch {
			return false;
		}
	},
	
	validateCategoryForCreation(category) {
		try {
			const hasNameKey = Object.keys(category)[0] === "name";
			const hasOnlyOneKey = Object.keys(category).length === 1;
				const validKeys = hasNameKey && hasOnlyOneKey;
			
			const hasStringInName = typeof(category.name) === "string";
				const validValues = hasStringInName;
			
			const validationResult = validKeys && validValues;
			return validationResult;
		} catch {
			return false;
		}
	},
	
	validateProductForCreation(product) {
		try {
			const hasNameKey = Object.keys(product)[0] === "name";
			const hasPriceKey = Object.keys(product)[0] === "price";
			const hasCategoryKey = Object.keys(product)[0] === "category";
			const hasOnlyThreeKeys = Object.keys(product).length === 3;
				const validKeys = hasNameKey && hasOnlyThreeKeys;
			
			const hasStringInName = typeof(product.name) === "string";
			const hasNumberInPrice = typeof(product.price) === "number" && product.price > 0;
			const hasNumberInCategory = typeof(product.category) === "number";
				const validValues = hasStringInName && hasNumberInPrice && hasNumberInCategory;
			
			const validationResult = validKeys && validValues;
			return validationResult;
		} catch {
			return false;
		}
	}
}

module.exports = helpers;