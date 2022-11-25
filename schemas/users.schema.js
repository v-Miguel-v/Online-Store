const Joi = require("joi");

const id = Joi.string().alphanum().min(1);
const name = Joi.string().min(2);
const age = Joi.number().integer().positive();

const fullValidationSchema = Joi.object({
	name: name.required(),
	age: age.required()
});

const simpleValidationSchema = Joi.object({
	name: name,
	age: age
});

const idValidationSchema = Joi.object({
	id: id.required()
});

module.exports = { fullValidationSchema, simpleValidationSchema, idValidationSchema };