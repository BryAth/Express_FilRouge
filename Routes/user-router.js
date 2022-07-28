const userController = require('../controllers/user-controller');
const idValidator = require('../middlewares/idValidator');
const userValidator = require('../validators/user-validator');
const bodyValidation = require('../middlewares/body-validation');
const authentification = require('../middlewares/auth-jwt-middleware');

const userRouter = require('express').Router();




userRouter.route('/')

    .get(userController.getAll)

userRouter.route('/:id')

    .get(authentification(), idValidator(),userController.getById)
    
    .put(authentification(["Admin"]),idValidator(),bodyValidation(userValidator),userController.update) //Modification d'une catégorie
    
    .delete(authentification(["Admin"]),idValidator(),userController.delete); //Suppresion d'une catégorie


module.exports = userRouter;    