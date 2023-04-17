const Joi = require ('joi');

const joiUserRegisterSchema = Joi.object({
    login: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).required()
});

module.exports = joiUserRegisterSchema;
