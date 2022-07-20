

const Category = require('../models/category-model')
//On crée notre categoryController,qui va contenir toutes les fonctions appelées par chaque route
const categoryController = {

    //Toutes ces fonctions devront etre asynchrones,on veut pouvoir lancer plusieurs requetes en meme temps et traiter le résultat qu'une seule fois 
    getAll : async (req,res) => { 
    // {console.log("Récupération de toutes les catégories");
    // res.sendStatus(501)},
            const categories = await Category.find();
            res.status(200).json(categories)
        },

    getById : async (req,res) => {
        //  console.log(`Récupération de la catégorie dont l'id est [${req.params.id}] `);
        // res.sendStatus(501)},
        //1) On récupere li'id passé en paramètres
            const id =  req.params.id;
        //2) On effectue la requête en base de données,en fournissant li'd de la catégorie recherchée
        //2.5) On stocke le résultat de cette requête dans une constante category
        const category = await Category.findById(id)
        console.log(category); // => Renvoie null si pas de catégorie
        
        if(category) {
            res.status(200).json(category);
        } // Si category n'exite pas,renvoie un statut 200 et la catégorie obtenue ;
        else{
            res.sendStatus(404)
            //Si la catégorie est null,on renvoie une erreur 404 => Ressource not found
        }
    },
    
    create : async (req,res) => {
        const categoryToAdd = Category(req.body);
        console.log(categoryToAdd);
        await categoryToAdd.save()
        res.status(200).json(categoryToAdd);
    },
    
    update : async  (req,res) => {console.log(`Modification de la catégorie dont l'id est [${req.params.id}]`)
    res.sendStatus(501)},
    
    delete : async (req,res) => {console.log(`Supression de la catégorie dont l'id est [${req.params.id}] `)
    res.sendStatus(501)}
    //Opérations CRUD
    //C => Create
    //R => Read
    //U => Update
    //D => Delete
}



//On exporte notre controller créer et configuré 
module.exports = categoryController;