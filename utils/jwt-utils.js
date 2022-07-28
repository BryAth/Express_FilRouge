const jwt = require ('jsonwebtoken') // IMporte le module jsonwebtoken

const { JWT_AUDIENCE,JWT_ISSUER,JWT_SECRET} = process.env;


const jwUtils = {
        //fonction pour créer un token
    generate : ({ id , pseudo,role}) =>{
        //Notre fonction generate , doit renvoyer une promesse
        //Pour qu'on puisse verifier par la suite si notre génération est réussie
        return new Promise ((resolve,reject) => {
            //On récupère nos données pour créer le payload
            const payload = {id ,pseudo,role};

            //Création de soptions (du header)
            const options = {
                algorithm : 'HS512',
                expiresIn : '12h',
                audience : JWT_AUDIENCE,
                issuer : JWT_ISSUER
            }
            //Pour générer un token,nous auront toujours besoin
            //D'un header/option qui contient toutes les informations sur le token (type,algo,expiration,etc...)
            //D'un payload : les données de l'user qu'on veut stocker dans le jeton /!\ Jamais de password
            //Le secret : signature secrète détenue par l'api qui va nous permettre de générer et décorer notre token.
            // /!\ Cette information ne doit jamais etre mise en clair dans le code ni push sur un git 
            //sinon n'importe qui peut décoder notre jeton

            jwt.sign (payload ,JWT_SECRET , options, (error,token) => {
                if(error){
                    //Si notre génération de token a produit une erreur,on passe notre promesse en rejetée
                    return reject(error);
                }   
                //Si la génération de token a fonctionné,on résoud la requête en fournissanrt le token généré
                resolve(token)
            })
        })
       
    },
    decode : (token) => {
        // Dans le cas ou on n'a pas de token
        if(!token){
            return Promise.reject(new Error('No token.'));
        }
        //Sinon,
        //On crée les options pour faire notre décodage
        return new Promise((resolve,reject) => {
            const options ={
                audience : JWT_AUDIENCE,
                issuer : JWT_ISSUER
            }
            jwt.verify(token,JWT_SECRET,options,(error,payload) =>{
                //Si on n'a pas réussi  à décoder
                if(error){
                    return reject(error);
                }
                //Si on a réussi à décoder,on résoud la promesse en renvoyant le payload/les datas
                resolve(payload)
            })
        });
    }
}

module.exports = jwUtils