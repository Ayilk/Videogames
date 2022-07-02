const {Router} = require('express');
const { getAllGames, addVideogames } = require('../controllers/Videogames');


const router = Router();

router.get('/', getAllGames );
router.post('/', addVideogames)


module.exports = router;