    const express = require('express'); //Importation du module express
    const categoryRouter = express.Router(); // A partir de la méthode Router (),on construit un nouveau  router qu'on appelle  CategoryRouter

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

categoryRouter.route('/')

.get((req, res) => { res.sendStatus(501);}) //Récupération de toutes les catégories

.post((req, res) => { res.sendStatus(501);}) //Ajout d'une nouvelle catégorie

categoryRouter.route('/:id')

.get((req,res) => { res.sendStatus(501); }) //Récupération d'une catégorie en particulier

.put((req, res) => { res.sendStatus(501) ;}) //Modification d'une catégorie

.delete((req, res) => { res.sendStatus(501)}); //Suppresion d'une catégorie


    //On exporte le module router 
    module.exports = categoryRouter;