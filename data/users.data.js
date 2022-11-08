// File System Module
const fs = require("fs");

function readRegister(path) {
	try {
		console.log("Leyendo registros");
		return fs.readFileSync(path, "utf-8");
	} catch (error) {
		console.error(error);
		return null;
	}
}

function parseData(data) {
	let entitiesParsed = null;
	if (data) {
		const entitiesUnparsed = data.split("\r\n");
		entitiesParsed = entitiesUnparsed.map(entity => JSON.parse(entity));
	}
	return entitiesParsed;
}

// Users
class User {
	constructor(id, name, age) {
		this.id = id;
		this.name = name;
		this.age = age;
	}
}

const users = [];
const usersUnparsedData = readRegister("./data/users.data.txt");
const usersParsedData = parseData(usersUnparsedData);
usersParsedData.forEach(user => users.push(new User(user.id, user.name, user.age)));

console.group("Users:");
	console.table(users);
console.groupEnd("Users:");

module.exports = users; 