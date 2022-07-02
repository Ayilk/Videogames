const {Router} = require('express');
const { getAllDevs } = require('../controllers/Developers');


const router = Router();

router.get('/', getAllDevs);


module.exports = router;