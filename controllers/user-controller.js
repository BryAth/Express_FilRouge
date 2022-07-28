const User = require("../models/user-model")
const UserDTO = require("../dto/user-dto")

//Fonction de mappage d'un user de DB en user DTO afin de retirer le password et role
//Comme nous avons à faire plusieurs fois cette fonction,pour ne pas faire de répétition,on vient le faire dans une function

const userToDTO = (user) => new UserDTO(user.id,user.email,user.pseudo,user.firstname,user.lastname)   



const userController = {

    getAll : async (req,res) => {
        const users  = await User.find();
        //On a récupéré les utilisateurs de la bdd MAIS on récupère aussi tous les password hashé
        // /!\ Pas top le password 

        //On va transformer les utilisateurs de la DB avec password en UserDTO qui est un User sans password (et role)

        // const userAvecLastNameEnMaj = users.map(user => user.lastname.toUppercase())
        // ...user => outil de décomposition d'un objet (fonctionne aussi sur les tableaux)
        const usersDTO = users.map(userToDTO);

        res.status(200).json(usersDTO);
    },
    getById : async (req,res) => {
        //On récupère dans la requête,l'id dans les paramètres
        const id = req.params.id;
        //On fait la requête pour récupérer l'utilisateur avec cet id
        const user = await User.findById(id)
        //On vérifie si on a bien récupéré un user
        if(!user){
            return res.sendStatus(404)
        }
        //Si trouvé
        const userDTO = userToDTO(user)
        res.status(200).json(userDTO);
    },
    update : async (req,res) => {
        //On a besoin de recuperer l'id de  l'élement à upgrader
        const id = req.params.id;
        

        
        //On appelle la fonction qui permet de trouver l'élément via son id et de le modifier
        //La fonction findByIdAndUpdate prends:
        // en 1er paramètre, l'id a trouver 
        // En 2eme paramètres,un objet qui contient les propriétés qu'on souhaite modifier
        //En 3ème paramètre,un objet qui contient les options qu'on souhaite ajouter
        //L'option returnDocument 'after' =  nous permet de récuperer l'utilisateur après sa modification et non avant (ce qui est le comportement par défaut)
        
        const userUpdated = await User.findByIdAndUpdate(id , { 

        pseudo : req.body.pseudo,
        email : req.body.email,
        firstname : req.body.firstname,
        lastname : req.body.lastname
        },{returnDocument : 'after'})

        //On vérifie si notre ID était existant
        if(!userUpdated){
            return res.sendStatus(404)
        }
        //Deux choix , soit on envoie juste un statut 200
        //Res.SendStatus200
        //Soit , on doit transformer notre userUpdated qui contient le password + role en userDTO qui ne les contient pas
        const userDTO = userToDTO(userUpdated);
        res.status(200).json(userDTO);

    }, 
    delete : async (req,res) => {
        //On a besoin de récuperer l'id de l'élément à supprimer
        const id = req.params.id

        //On essaie de récupérer l'élément en db et de le supprimer
        //La fonction findByIdAndDelete renvoie l'utilisateur trouvé si id ok , sinon renvoie null
        const userToDelete =  await User.findByIdAndDelete(id)
        
        //On vérifie si on a bien récupéré un userToDelete
        if(!userToDelete){
            return res.sendStatus(404) //NotFound => id 
        }
        return res.sendStatus(204); //Tout s'est bien passé,id trouvé,plus suppresion faite
    }

}


module.exports = userController;