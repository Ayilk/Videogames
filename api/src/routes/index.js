const { Router } = require('express');


// const videogamesRouter = require('./Videogames');


const router = Router();



 //router.use('/videogames', videogamesRouter);


router.use('/', (req, res) => {
    res.status(200).send({message: "Ruta principal conectada exitosamente"})
})

module.exports = router;