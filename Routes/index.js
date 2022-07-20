const categoryRouter = require ('./category-router')
const userRouter = require ('./user-router')
const authRouter = require ('./auth-router');
const taskRouter = require ('./task-router')



//Création du routeur "parent"
const router = require('express').Router();


//Paramétrer toutes les routes
// Nous indiquons qu'à l'arrivée sur le segment /category,nous devons  charger le routeur  enfant category-routeur


router.use('/category',categoryRouter)
router.use('/task',taskRouter)
router.use('/user',userRouter)
router.use('/auth',authRouter)








// (/category => categoryRouter)
//(/task => taskRouter)

// (/category => categoryRouter)
// (/task => taskRouter)


module.exports = router;