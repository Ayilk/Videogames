const {Router} = require('express');
const { getAllGames } = require('../controllers/Videogames');


const router = Router();

router.get('/', getAllGames );


module.exports = router;