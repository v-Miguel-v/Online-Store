const DATA = require("../data/users.data");
const boom = require("@hapi/boom");
const USERS_KEYS_LENGTH = 2;

class UsersService {
	constructor(){
		this.users = DATA;
	}
	
	getAll(){
		return new Promise((resolve, reject) => {
			try {
				resolve(this.users);
			} catch (error) {
				reject(error);
			}
		});
	}
	
	search(givenId){
		return new Promise((resolve, reject) => {
			try {
				const userFound = this.users.find(user => user.id === givenId);				
				if (!userFound) {
					throw boom.notFound("No se encontró al usuario especificado.");
				} else {
					resolve(userFound);
				}
			} catch (error) {
				reject(error);
			}
		});
	}
	
	validate(givenUser, validationType){
		return new Promise((resolve, reject) => {
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
					
					if (validationResult) {
						resolve(validationResult);
					} else {
						throw boom.badRequest("Usuario Inválido.");
					}
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
						let validValues = true;
							if (hasNameKey) if (!hasStringInName) validValues = false;
							if (hasAgeKey) if (!hasNumberInAge) validValues = false;
					
					const validationResult = validKeys && validValues;
					if (validationResult) {
						resolve(validationResult);
					} else {
						throw boom.badRequest("Usuario Inválido.");
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
	
	create(givenUser){
		return new Promise(async (resolve, reject) => {
			try {
				await this.validate(givenUser, "full validation");
				const thereAreUsers = this.users.length > 0;
				let newId = null;
				if (thereAreUsers) {
					const lastIndex = this.users.length - 1;
					const lastId = Number(this.users[lastIndex].id);
					newId = String(lastId+1);
				}
				if (!thereAreUsers) {
					newId = "0";
				}
				const newUser = {id: newId, ...givenUser};
				this.users.push(newUser);
				resolve(newUser);
			} catch (error) {
				reject(error);
			}
		});
	}
	
	delete(givenId){
		return new Promise(async (resolve, reject) => {
			try {
				await this.search(givenId);
				const index = this.users.findIndex(user => user.id === givenId);
				const deletedUser = this.users[index];
				this.users.splice(index, 1);
				resolve(deletedUser);
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
				
				const user = this.users.find(user => user.id === givenId);
				const index = this.users.findIndex(user => user.id === givenId);
				this.users[index] = { ...user, ...givenUpdate };
				const updatedUser = this.users[index];
				resolve(updatedUser);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = UsersService;