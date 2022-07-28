const taskController = require('../controllers/task-controller');
const bodyValidation = require('../middlewares/body-validation');
const idValidator = require('../middlewares/idValidator');

const {insertTaskValidator,updateTaskValidator} = require ('../validators/task-validator')

const taskRouter = require('express').Router();


//!

taskRouter.route('/')

.get(taskController.getAll)
.post( bodyValidation(insertTaskValidator) ,taskController.create)

taskRouter.route('/:id')

.get(idValidator(),taskController.getById)
.put(idValidator(),taskController.update) //Modification d'une catégorie

.delete(idValidator(),taskController.delete); //Suppresion d'une catégorie

taskRouter.route('/category/:id')
.get(taskController.getByCategory)

taskRouter.route('/user/:id')
.get(taskController.getByUser)

module.exports = taskRouter;