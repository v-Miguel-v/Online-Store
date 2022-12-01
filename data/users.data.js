// File System Module

/*
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
*/

const users = [
	{id:"0",name:"Miguel",age:22},
	{id:"1",name:"Luis",age:25},
	{id:"2",name:"Gabriela",age:32},
	{id:"3",name:"Alondra",age:19},
	{id:"4",name:"Mike",age:18},
	{id:"5",name:"Rafael",age:40},
	{id:"6",name:"Oriana",age:20},
	{id:"7",name:"Ania",age:31}
];

console.group("Users:");
	console.table(users);
console.groupEnd("Users:");

module.exports = users; 