const Joi = require ('joi');

const joiUserLoginSchema = Joi.object({
    login: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).required(),
    email: Joi.string().min(5).max(50).email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'ua'] }
    }),
    fullname:  Joi.string().min(4).max(50),
    role: Joi.string()
});

module.exports = joiUserLoginSchema;