const yup = require ('yup');



//Verifie si le mdp contient un chiffre,minuscule,majuscule,carac spécial
const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_]).+$/; 



//On créer le model de validation pour le body du register
//Ex : 
// {
// 	"pseudo" : "r4zen",
// 	"email" : "lequeux.bryan95@gmail.com",
// 	"firstname" : "Bryan",
// 	"lastname" : "Lequeux",
// 	"password" : "1234-"
// }


const registerValidator = yup.object({
    pseudo : yup.string().trim().required().min(3).max(50),
    email : yup.string().trim().email().max(255),
    firstname : yup.string().trim().required().max(100),
    lastname : yup.string().trim().required().max(150),
    password : yup.string().required().min(8).max(64).matches(pwdRegex)
})

//On crée le model de validation pour le body du login.
//Ex : 
// {
// 	"credential" : "r4zen",
// 	"password" : "1234-" 
	
// }
const loginValidator = yup.object({
    Credential :yup.string().required().trim().max(255),
    password : yup.string().required()
})


module.exports ={ registerValidator,loginValidator}
