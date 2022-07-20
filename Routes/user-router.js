const userRouter = require('express').Router();




userRouter.route('/')

.get((req,res) => { res.sendStatus(501);})

userRouter.route('/:id')

.get((req,res) => {res.sendStatus(501);})
.put((req, res) => { res.sendStatus(501) ;}) //Modification d'une catégorie

.delete((req, res) => { res.sendStatus(501)}); //Suppresion d'une catégorie


module.exports = userRouter;    