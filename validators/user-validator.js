const yup = require("yup")


const userValidator = yup.object({
    pseudo : yup.string().trim().required().min(3).max(50),
    email : yup.string().trim().email().max(255),
    firstname : yup.string().trim().required().max(100),
    lastname : yup.string().trim().required().max(150),
    
})

module.exports = userValidator;
///sabosaboisa