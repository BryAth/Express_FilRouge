//Pour utiliser dotenv,on doit l'importer.
// let dotenv = require("dotenv-flow");
//Pour charger tous nos fichiers .env.*
// dotenv.config()
//Puisqu'on ne va plus utiliser la variable dotenv par la suite,on peut directement faire le .config sur l'import.
// /!\ Attention,la config de l'environemment devra toujours être faites au tout début du programme.
require("dotenv-flow").config();




// console.log(process.env);
//On extrait de process.en,les variables d'environemment dont on aura besoin par la suite.
const { MESSAGE,NODE_ENV, PORT  } = process.env
console.log( 'Lancé en ' , NODE_ENV, ' : ', MESSAGE );




//Création d'un serveur Express :
// 1) Toujours faire en premier  : importer express et le stocker dans une variable .
const express = require('express');

//On importe notre module router présent dans l'index.js en important tout le dossier routes

const router = require("./Routes");

const app = express()


//#region route temporaire pour vérifier que notre application express fonctionne bien avant de faire un routing  tout propre



//Mise en place d'une route temporaire
// app.get('/users',(req,res) => {
    
    //     const data = {
        //         msg : 'Salut'
        //     }
        //     res.json(data);
        // })
        // app.all('/user' , () => {
            
            // })
            
//On indique à notre serveur , qu'à l'arrivée sur la route /api,il doit utiliser notre module router
app.use('/api',router);

//On crée le serveur et on le stocke dans une variable.


//On met le server sur écoute sur le port précisé dans la variable d'environnement port
app.listen(PORT, () => {
    console.log(`Server up on port : ${PORT} [${NODE_ENV}]`);
})