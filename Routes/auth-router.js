const authController = require('../controllers/auth.controller');

const authRouter = require('express').Router();
const bodyValidation = require ('../middlewares/body-validation')
const {registerValidator, loginValidator} = require('../validators/auth-validator')




authRouter.route('/login',bodyValidation(loginValidator))

.post(authController.login) 

authRouter.route('/register')

.post(bodyValidation(registerValidator),authController.register);




module.exports = authRouter;