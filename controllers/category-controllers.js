

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
            return res.sendStatus(404)
            //Si la catégorie est null,on renvoie une erreur 404 => Ressource not found
        }
    },
    
    create : async (req,res) => {
        const categoryToAdd = Category(req.body);
        console.log(categoryToAdd);
        await categoryToAdd.save()
        res.status(200).json(categoryToAdd);
    },
    
    update : async  (req,res) => {
        const id = req.params.id;
        const category =  await Category.findByIdAndUpdate(id, {
            name : req.body.name,
            icon : req.body.icon
        }, {returnDocument : 'after'}); //Le comportement par défaut du findByIdAndUpdate renvoie l'élément avant qu'il ne soit modifier
                                        // Si on veut récupérer l'élement après modification,on devra rajouter l'option returnDocument : 'after'
        if(category){
            res.status(200).json(category);
        }
        else{
            return res.sendStatus(404)
        }
    },
    
    delete : async (req,res) => 
        {
            const id = req.params.id;
            //La fonction findByIdAndDelete renvoie l'élément qui a été delete si trouvé,sinon,renvoie null
            const categoryToDelete =   await Category.findByIdAndDelete(id);
            //On doit vérifier si categoryToDelete n'est pas null
            if(categoryToDelete){
                res.sendStatus(204) //La requête a réussi mais l'appli client n'a pas besoin de quitter la page
            }
            else{
                return res.sendStatus(404) //Si categoryToDelete est null,c'est que l'id recherché n'existe pas : Not found
            }

        }
    
    // {console.log(`Supression de la catégorie dont l'id est [${req.params.id}] `)
    // res.sendStatus(501)}
    
    
    
    
    //Opérations CRUD
    //C => Create
    //R => Read
    //U => Update
    //D => Delete
}



//On exporte notre controller créer et configuré 
module.exports = categoryController;