const mongoose = require('mongoose')

const idValidator = () => {

    return (req,res,next) => {
        const id = req.params.id;
        // Si l'id n'est pas un objectId valide ;

        if(!mongoose.isValidObjectId(id)){
            res.sendStatus(400) // => Bad request ; la requete n'est pas bonne.
            return;
        }   
        //Sinon , on continue la requete grace au next()
        next()
    }
}

module.exports = idValidator;