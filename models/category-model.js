const { Schema , model} = require ('mongoose');
//On crée le schema d'une catégorie , c'est à dire que,ce à quoi,une catégorie devrait ressembler en DB

    //Le nom de catégorie est une chaine de caractère,unique,requise et nettoyée des espaces blancs ) gauch et à droite
    //L'icon de catégorie  est une chaine de caracètre ,requise et nettoyée des espaces blancs )à gauche et a droite

//new Schéma ({ description des camps,leur types,ertc} , {options sur l'entiereté d'une catégorie})
const categorySchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        trim : true 
    },
    icon : {
        type: String,
        required : true,
        trim : true
        } 
        },
        
        { 
        collection : 'Category',
        timestamps : true
    

});

//On genère un modèle à partir du schema qu'on a crée au dessus 
const Category = model('Category',categorySchema)
module.exports = Category;