const DATA = require("../data/users.data");
const USERS_KEYS_LENGTH = 2;

class UsersService {
	constructor(){
		this.users = DATA;
	}
	
	getAll(){
		return this.users;
	}
	
	search(givenId){
		return this.users.find(user => user.id === givenId);
	}
	
	validate(givenUser, validationType){
		try {
			if (validationType === "full validation") {
				const hasNameKey = Object.keys(givenUser)[0] === "name";
				const hasAgeKey = Object.keys(givenUser)[1] === "age";
				const hasCorrectNumberOfKeys = Object.keys(givenUser).length === USERS_KEYS_LENGTH;
					const validKeys = hasNameKey && hasAgeKey && hasCorrectNumberOfKeys;
				
				const hasStringInName = typeof(givenUser.name) === "string" && givenUser.name.length > 0;
				const hasNumberInAge = typeof(givenUser.age) === "number" && givenUser.age > 0;
					const validValues = hasStringInName && hasNumberInAge;
				
				const validationResult = validKeys && validValues;
				return validationResult;
			}
			
			else if (validationType === "simple validation") {
				const hasNameKey = Object.keys(givenUser).includes("name");
				const hasAgeKey = Object.keys(givenUser).includes("age");
				let hasAnotherKey = null;
					Object.keys(givenUser).forEach(key => {
						if ( (key !== "name") && (key !== "age") ) {
							hasAnotherKey = true;
						}
					});
				const hasCorrectNumberOfKeys = Object.keys(givenUser).length < USERS_KEYS_LENGTH;
				const validKeys = (hasNameKey || hasAgeKey) && hasCorrectNumberOfKeys && !hasAnotherKey;
				
				const hasStringInName = typeof(givenUser.name) === "string" && givenUser.name.length > 0;
				const hasNumberInAge = typeof(givenUser.age) === "number" && givenUser.age > 0;
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
	}
	
	create(givenUser){
		// próximamente
	}
	
	delete(givenId){
		// próximamente
	}
	
	simpleUpdate(givenUser){
		// próximamente
	}
	
	fullUpdate(givenUser){
		// próximamente
	}
}

module.exports = UsersService;