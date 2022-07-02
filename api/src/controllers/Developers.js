const { Developers } = require('../db');
const axios = require('axios'); 
const { BASE_URL, API_KEY, DEV_URL} = process.env;

function getAllDevs(req, res, next) {
	return axios.get(`${BASE_URL}${DEV_URL}${API_KEY}`)
    .then(r => {
        const results1 = r.data.results
        return axios.get(r.data.next)
        .then(r => {
            const union = results1.concat(r.data.results)
            const consoles = union.map(el => el.name)
            
            consoles.forEach(el => {
                Developers.findOrCreate({where: {name: el}})
            });
            Developers.findAll()
            .then(r => {
                return res.send(r)
            })
        })
    })
	
}

module.exports = {
    getAllDevs
}