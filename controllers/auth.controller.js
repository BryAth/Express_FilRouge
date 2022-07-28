const User = require("../models/user-model");


// On importe notre utilitaire pour pouvoir générer un token
const jwUtils = require ("../utils/jwt-utils")

const argon2 = require('argon2')

const authController = {

    login : async(req,res)=> {
        //Pour se loger , on va recevoir un identifiant et un mdp et on va devoir si un user correspond a ces données.
        // {
        //     "credential" : "monIdentifiant"; //monIdentifiant sera soit un pseudo,soit un email
        //     "password" : "monPassword"
        // }
        
        const {credential,password} = req.body;

        //On construit notre filtre
        //On construit notre filtre : on recherche l'user dont l'email correspeond a la valeur dans credential 
        //OU son pseudo correspont à la valeur dans credential
        const credentialFilter = {
            $or : [ {email :  credential} , {pseudo : credential}]
            
        }
        const user = await User.findOne(credentialFilter);
        if(!user){
            //Si pas 
            return res.status(401).json({error : 'Bad credentials. '}) //401 => Unauthorized => Pas les bons logins
        }

        //Si on a un utilisateur,on doit vérifier si son MDP correspond au mdp dans le req.bory correspond au mdp hash en bdd.

        const isPasswordValid =  await argon2.verify(user.password,password)
        //Si le mdp de la requete et celui de la bdd ne correspondent  pas
        if(!isPasswordValid){
            //Envoi d'erreur
            return res.status(401).json({error : 'Bad credentials'})
        }

        
        //TODO : générer et renvoyer un token.
        const token = await jwUtils.generate(user)
        return res.json({token})

    },
    register : async(req,res) => {
        //Pour enregistrer un nouvel user,on ne va pas stocker son MDP en clair dans la BDD , on va donc devoir le hasher à l'aide d'un module fort pratique.



        //On récupère dans la body,toutes les informations qui nous interssent pour faire un nouvel user
        const {pseudo,email,firstname,lastname,password}  = req.body;

        //Hashage du password

        const hashedPassword = await argon2.hash(password);
         


        //On crée un nouvel user à rentrer en db à partir des infos sur req.body
        //SAUF  LE PASSWORD qu'on stocke jamais en clair,on va stocker le password hashé.
        const userToInsert =   User({
            pseudo  ,
            email,
            firstname,
            lastname,
            password :  hashedPassword //Pour le password de notre user à insérer en db,on fourni le password une fois hashé.
        })
        await userToInsert.save()
        const token  = await jwUtils.generate(userToInsert)
        res.status(200).json({token});
    }    


}


module.exports = authController;