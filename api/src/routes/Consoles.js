const {Router} = require('express');
const { getAllConsoles } = require('../controllers/Consoles');

const router = Router();

router.get('/', getAllConsoles);


module.exports = router;