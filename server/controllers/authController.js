const ApiError = require("../helpers/error/ApiError");
const { UserModel } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secureConfig = require('../secureConfig.json');
const mailingService = require('../services/PassworResetMailingService');
const JwtGenerator = require('../helpers/jwtGenerators/jwtGenerator');
const resetJwtGenerator = require('../helpers/jwtGenerators/resetJwtGenerator');

class AuthController {

    async getAllUser (req, res, next) {
        try {
            UserModel.findAll().then(resolve => {
                if (resolve.length > 0) {
                    return res.json(resolve)
                }
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async getUserById (req, res, next) {
        const {id} = req.params
        try {
            UserModel.findOne({where:{user_id: id}}).then(resolve => {
                return res.json(resolve)
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }

    async registration(req, res, next) {
        try {
            let { login, password, email, role, fullName } = req.body;
            console.log(login);
            if (!login || !password || !email || !fullName) {
                return next(ApiError.conflict('Missing Data'));
            }
            else {
                console.log("Lox");
                if (!role) {
                    role = "USER";
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                await UserModel.create({ email: email, fullname: fullName, login: login, password: hashedPassword, role: role })
                    .then(result => {
                        return res.json({ message: "User created" });
                    })
                    .catch(err => {
                        if (err.errors[0].type === "unique violation") {
                            return next(ApiError.conflict(err.errors[0].path + " already in use"));
                        }
                        else {
                            return next(ApiError.internal('Unknown error: ' + err));
                        }

                    });
            }
        } catch (err) {
            return next(ApiError.internal('Unknown error: ' + err));
        }
    }
    async login(req, res, next) {
        try {
            let { login, password } = req.body;
            if (!login || !password) {
                return next(ApiError.conflict('Missing Data'));
            }
            else {
                await UserModel.findAll({
                    where: {
                        login: login
                    }
                }).then(result => {
                    if (result.length <= 0) {
                        return next(ApiError.badRequest('user not found'));
                    }
                    else {
                        if (bcrypt.compareSync(password, result[0].password)) {
                            const token = JwtGenerator({
                                userId: result[0].user_id, 
                                login: result[0].login, 
                                email: result[0].email, 
                                fullName: result[0].fullname, 
                                role: result[0].role
                            });
                            return res.json({
                                token: token,
                                userData: {
                                    userId: result[0].user_id,
                                    login: result[0].login,
                                    email: result[0].email,
                                    fullname: result[0].fullname,
                                    role: result[0].role
                                },
                                message: "Succesfull"
                            });
                        }
                        else {
                            return next(ApiError.conflict('Incorrect password'));
                        }
                    }
                })
                    .catch(err => {
                        return next(ApiError.internal('Unknown error: ' + err));
                    })
            }
        } catch (err) {
            return next(ApiError.internal('Unknown error: ' + err));
        }
    }
    async logout(req, res, next) {
        try {
            return res.json("Goodbye");
        } catch (err) {
            return next(ApiError.internal('Unknown error: ' + err));
        }
    };
    async resetPassword(req, res, next) {
        try {
            const { email } = req.body;
            if (!email) {
                return next(ApiError.conflict('Missing Data'));
            }
            else {
                await UserModel.findAll({
                    where: {
                        email: email
                    }
                })
                    .then(result => {
                        if (result.length <= 0) {
                            return next(ApiError.badRequest('email not found'));
                        }
                        else {
                            const token = resetJwtGenerator(result[0].user_id, result[0].email)
                            const message = mailingService(email, token);
                            return res.json({message: "Succesfull"});//res.json(`http://localhost:5000/api/auth/password-reset/${token}`);
                        }
                    })
                    .catch(err => {
                        return next(ApiError.internal('Unknown error: ' + err));
                    })
            }
        } catch (err) {
            return next(ApiError.internal('Unknown error: ' + err));
        }
    };
    async resetPasswordAuntification(req, res, next) {
        try {
            const { token } = req.params;
            const { password } = req.body;
			if(password.length < 8)
			{
				return res.json({ message: "Password must be at least 8 characters long" });
			}
            const decoded = jwt.verify(token, secureConfig.SECRET_KEY_FOR_EMAIL)
            if (!decoded) {
                return next(ApiError.forbidden('Token decoding error'));
            }
            else {
                await UserModel.findAll({
                    where: {
                        email: decoded.email
                    }
                }).then(async (result) => {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    await UserModel.update({
                        password: hashedPassword,
                    },
                        {
                            where: { user_id: result[0].user_id }
                        }).then(result => {
                            return res.json({ message: "Password changed" });
                        }).catch(error => {
                            return next(ApiError.internal('Unknown error: ' + error));
                        });
                }).catch(error => {
                    return next(ApiError.badRequest('User\'s email not found: ' + decoded.email));
                })
            }

        } catch (err) {
            return next(ApiError.internal('Unknown error: ' + err));
        }
    };
    async updateUser(req, res, next) {
        try {
            const {id} = req.params;
            const {login, fullname, email} = req.params;
            if (!email, !login, !fullname) {
                return next(ApiError.conflict('Missing Data'));
            }
            else {
                await UserModel.update({
                    login, email, fullname
                },{
                    where: {
                        user_id: id
                    }
                }).then((result) => {
                        return res.json(result)
                    })
                    .catch(err => {
                        return next(ApiError.internal('Unknown error: ' + err));
                    })
            }
        } catch (err) {
            return next(ApiError.internal('Unknown error: ' + err));
        }
    };
}

module.exports = new AuthController();