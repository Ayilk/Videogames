const { Videogames, Consoles, Developers } = require('../db');
const axios = require('axios'); 
const { BASE_URL, API_KEY, GAMES_URL} = process.env;

function getAllGames(req, res, next) {
	const getApiInfo = () => {
        return axios.get(`${BASE_URL}${GAMES_URL}${API_KEY}`)
        .then(r => {
            const results1 = r.data.results
            return axios.get(r.data.next)
            .then(r => {
                const union = results1.concat(r.data.results)
                const games = union.map(el => {
                    return{
                        id: el.id,
                        name: el.name,
                        year: parseInt(el.released.slice(0,4),10),
                        consoles: el.platforms.map(el => el.platform.name),
                        image: el.background_image,
                        active: true
                    }
                })
                return games
                          
            })
        })
    }
    const getDbInfo = () => {
        return Videogames.findAll({
            include: {model: Consoles},
            include: {model: Developers}
        }).then(r => {
            console.log(r)
            return r
        })
    }

   
        Promise.all([getApiInfo(), getDbInfo()])
        .then(r => {
            const [apiInfo, dbInfo] = r;
            const info = apiInfo.concat(dbInfo);
            res.send(info)
        }).catch(error => next(error))
      
}

module.exports = {
    getAllGames
}