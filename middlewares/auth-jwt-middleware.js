
const User = require('../models/user-model');
const jwUtils = require('../utils/jwt-utils');
const jwtUtils = require('../utils/jwt-utils')

//Roles sera un tableau qui contient tous les roles qui ont accès à la route.

const authentification = (roles) =>{
    return async (req,res,next) => {
        const authHeader = req.headers['authorization'];
        //On récupère dans le header,la valeur de la propriété authorization
            //On récupère une chaine de caractère qui contient "Bearer letokentreslongavecpleindechiffresetdelettresetc"
            //Si on veut récuperer seulement le token,on va devoir utiliser le split pour récup seulement ce dernier
            //authHeader , si pas de token passé dans les header,sera null
            //On doit donc vérifier qu'il n'est pas null avant de faire le split ou non dessus.
            //Comme 
            const token = authHeader ? authHeader.split(' ')[1]: false ;


            //Si nous n'avons pas récupérer de token
            if(!token){
                return res.sendStatus(401) //Unauthorized (=> Nous ne sommes pas autorisés à accéder à cette route)
            }
            //Si on a un token,on va devoir le décoder
            
            let decodedToken ; 
            try {   
                decodedToken = await jwtUtils.decode(token)
                //Si le décodage fonction , decotedToken ressemble à ceci
                // decodedToken = {
                //     id : "216528c949a94f",
                //     pseudo : "oui-oui",
                //     role : "User"
                // }
            }
            catch(error){
                return res.sendStatus(403)
            }
            //Si on a réussi à le décoder,on valide les éventuelles options passées en paramètre.
            //On vérifie si on a recu un tableau de rôles.
            if(roles){
                //On va vérifier en base de données si l'user a un des roles présents dans notre tableau
                //On vérifie toujours en DB et pas dans le decodedToken au cas où le role de la personne a été changé 
                //Depuis sa dernière connection.
                //On récupère l'utilisateur connecté dans le BDD
            const userDB = await User.findById(decodedToken.id);
            //On récupère son role
            const userDBrole = userDB.role;
            // const userDBrole = await User.findById(decodedToken).role;
                roles.includes('pouet')
            if(!roles.includes(userDBrole)){
                return res.sendStatus(403) //Forbidden (nous n'avons pas les droits)
                }
            }
            req.user = decodedToken;
            next();
        }
}

module.exports = authentification;