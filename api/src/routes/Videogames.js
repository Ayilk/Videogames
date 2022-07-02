const {Router} = require('express');
const { getAllGames, addVideogames, gameDelete } = require('../controllers/Videogames');


const router = Router();

router.get('/', getAllGames );
router.post('/', addVideogames);
router.delete('/:id', gameDelete)


module.exports = router;