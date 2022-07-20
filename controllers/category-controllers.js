
//On crée notre categoryController,qui va contenir toutes les fonctions appelées par chaque route
const categoryController = {
    getAll : (req,res) => {console.log("Récupération de toutes les catégories");
    res.sendStatus(501)},
    getById : (req,res) => { console.log(`Récupération de la catégorie dont l'id est [${req.params.id}] `);
    res.sendStatus(501)},
    create : (req,res) => {console.log("Création d'une nouvelle catégorie")
    res.sendStatus(501)},
    update : (req,res) => {console.log(`Modification de la catégorie dont l'id est [${req.params.id}]`)
    res.sendStatus(501)},
    delete : (req,res) => {console.log(`Supression de la catégorie dont l'id est [${req.params.id}] `)
    res.sendStatus(501)}
    //Opérations CRUD
    //C => Create
    //R => Read
    //U => Update
    //D => Delete
}



//On exporte notre controller créer et configuré 
module.exports = categoryController;