const DATA = require("../data/users.data");
const boom = require("@hapi/boom");

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
	
	create(givenUser){
		return new Promise((resolve, reject) => {
			try {
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
	
	update(givenId, givenUpdate){
		return new Promise(async (resolve, reject) => {
			try {
				await this.search(givenId);
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