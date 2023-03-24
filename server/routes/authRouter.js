const Router = require('express');
const router = new Router();
const authController = require('../controllers/authController');
const userValidation = require('../middleware/validators/validation');
const joiUserRegisterSchema = require('../helpers/joiValidation/userRegisterSchema');
const joiUserLoginSchema = require('../helpers/joiValidation/userLoginSchema');

router.get('/users',authController.getAllUser)
router.post('/register', userValidation(joiUserRegisterSchema),authController.registration);
router.post('/login', userValidation(joiUserLoginSchema), authController.login);
router.post('/logout', authController.logout);
router.post('/password-reset', authController.resetPassword);
router.post('/password-reset/:token', authController.resetPasswordAuntification);

module.exports = router;