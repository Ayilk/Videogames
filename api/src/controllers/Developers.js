const { Developers, Videogames } = require('../db');
const axios = require('axios'); 
const { BASE_URL, API_KEY, DEV_URL} = process.env;

function getAllDevs(req, res, next) {
	return axios.get(`${BASE_URL}${DEV_URL}${API_KEY}`)
    .then(r => {
        const results1 = r.data.results
        return axios.get(r.data.next)
        .then(r => {
            const union = results1.concat(r.data.results).map(el => el.name)
            //const games = results1.concat(r.data.results).map(el => el.games.map(el => el.name))
            
            union.forEach(el => {
                Developers.findOrCreate({where: {name: el}})
            });
            Developers.findAll({
                include: [
                    {model: Videogames,
                     attributes:  ["name", "id"] ,
                     through: {
                        attributes: [],
                    },
                    },
                ]
            })
            .then(r => {
                return res.send(r)
            })
        })
    })
	
}

module.exports = {
    getAllDevs
}