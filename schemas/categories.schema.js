const Joi = require("joi");

const id = Joi.string().alphanum().min(1);
const name = Joi.string().min(2);

const fullValidationSchema = Joi.object({
	name: name.required()
});

const simpleValidationSchema = Joi.object({
	name: name
});

const idValidationSchema = Joi.object({
	id: id.required()
});

const twoIdsValidationSchema = Joi.object({
	categoryId: id.required(),
	productId: id.required()
});

module.exports = { fullValidationSchema, simpleValidationSchema, idValidationSchema, twoIdsValidationSchema };