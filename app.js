//Pour utiliser dotenv,on doit l'importer
// let dotenv = require("dotenv-flow");
//Pour charger tous nos fichiers .env.*
// dotenv.config()
//Puisqu'on ne va plus utiliser la variable dotenv par la suite,on peut directement faire le .config sur l'import
// /!\ Attention,la config de l'environemment devra toujours être faites au tout début du programme.
require("dotenv-flow").config();

// console.log(process.env);
//On extrait de process.en,les variables d'environemment dont on aura besoin par la suite.
const { MESSAGE,NODE_ENV } = process.env
console.log( 'Lancé en ' , NODE_ENV, ' : ', MESSAGE );