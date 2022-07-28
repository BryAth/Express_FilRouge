const categoryValidator = require("../validators/category-validator")


const bodyValidation =  (yupValidator)  => {

    return async (req,res,next) => {
        //On essaie de passer la validation
        try{
            
            //req.body contient l'object json qu'on essaye d'inserer ou de modifier (en post ou en put.)
            //Si on arrive ici dpeuis la route /ap/category : 
            //Yupvalidator conteint notre categoryValidator , donc on va déclencher la validation
            //Sur notre categoryValidator
            
            const valiData = await yupValidator.noUnknown().validate(req.body,
                {
                    abortEarly : false
                })
                //On remplace req.body qui contient potentiellement des données en plus que ce que l'on souhaite
                //par validata,qui a été nettory des données qu'on ne souhaite pas insérer
                req.body = valiData;
                //On continue la requête
                next();
        }
        //Si on a une erreur : on reverra bad request
        catch(e) {
            res.sendStatus(400); // Bad request
        }

    }

}

module.exports = bodyValidation;