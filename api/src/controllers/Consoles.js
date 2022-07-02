const { Consoles } = require('../db');
const axios = require('axios'); 
const { BASE_URL, API_KEY, CONSOLE_URL} = process.env;

function getAllConsoles(req, res, next) {
	return axios.get(`${BASE_URL}${CONSOLE_URL}${API_KEY}`)
    .then(r => {
        const results1 = r.data.results
        return axios.get(r.data.next)
        .then(r => {
            const union = results1.concat(r.data.results).map(el => el.name)
            
            union.forEach(el => {
                Consoles.findOrCreate({where: {name: el}})
            });
            Consoles.findAll()
            .then(r => {
                return res.send(r)
            })
        })
    })
	
}

module.exports = {
    getAllConsoles
}
