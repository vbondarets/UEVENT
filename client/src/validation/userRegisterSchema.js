const Joi = require ('joi');

const joiUserRegisterSchema = Joi.object({
    login: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(50).email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] }
    }).required(),
    password: Joi.string().min(8).required(),
    fullName:  Joi.string().min(4).max(50).required()
});

module.exports = joiUserRegisterSchema;
