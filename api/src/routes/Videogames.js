const {Router} = require('express');
const { getAllGames, addVideogames, gameDelete, updateGame } = require('../controllers/Videogames');


const router = Router();

router.get('/', getAllGames );
router.post('/', addVideogames);
router.delete('/:id', gameDelete);
router.put('/:id', updateGame)


module.exports = router;