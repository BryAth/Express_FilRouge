    const express = require('express'); //Importation du module express
    const categoryRouter = express.Router(); // A partir de la méthode Router (),on construit un nouveau  router qu'on appelle  CategoryRouter

    //Import du controller category 
    const categoryController = require('../controllers/category-controllers');
const idValidator = require('../middlewares/idValidator');
const bodyValidation = require ("../middlewares/body-validation")
const categoryValidator = require ("../validators/category-validator");
const authentification = require('../middlewares/auth-jwt-middleware');

    // const categoryRouter = require('express').Router() => Manière plus rapide pour 

    //Configuration des différentes routes,

    // /!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\/!\
    // Deux méthodes ; 

    // categoryRouter.get('/',(req,res) => {
    //     console.log('Liste de toutes les catégories : ');
    //     res.sendStatus(501) // Erreur  -> Fonctionnalité pas encore implémentée
    // }) 
    // categoryRouter.get('/:id',(req,res) => {
    //     console.log(`Récupération de la catégorie  dont l\'id est  : ${req.params.id}`);
    //     res.sendStatus(501)
    // })
    // categoryRouter.post('/' , (res,req) => {
    //     console.log("Envoi d'une nouvelle catégorie");
    //     res.sendStatus(501)
    // })
    // categoryRouter.get('/:id',(req,res) => {
    //     console.log();
    // })
    // categoryRouter.delete('/:id',(res,req) => {
    //     console.log(`Supression de la catégorie dont l'id  est : ${req.params.id}`);
    //     res.sendStatus(501);
    // })
    

    //////////////////////////VERSUS////////////////////////////


    //On peut remarquer  que les routes '/' et '/:id' se répetent  mais avec différentes méthodes (get,push,delete,post)    
    //Il existe une manière plus rapide d'écrire les routes


    
    //On peut remarquer que les routes '/' et '/:id' se répètent mais avec différentes méthodes (get, put, post, delete)

//Il existe une écriture raccourcie pour définir les routes
// categoryRouter.use(idValidator())
categoryRouter.route('/')

.get(categoryController.getAll) //Récupération de toutes les catégories

.post(authentification(["User","Moderator","Admin"]), bodyValidation(categoryValidator),categoryController.create) //Ajout d'une nouvelle catégorie

categoryRouter.route('/:id')

.get(idValidator(),categoryController.getById) //Récupération d'une catégorie en particulier

.put(authentification(["Admin","Moderator"]), bodyValidation(categoryValidator),categoryController.update) //Modification d'une catégorie

.delete(authentification("Admin"),categoryController.delete); //Suppresion d'une catégorie

// ^ On rajoute notre middleware de validation de format de l'iD pour chaque route ou on a besoin de valider l'id
    //On exporte le module router 
    module.exports = categoryRouter;