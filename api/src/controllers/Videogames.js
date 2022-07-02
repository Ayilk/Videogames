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
        }).catch(error => next(error))
    }
    const getDbInfo = () => {
        return Videogames.findAll({
            include: [
                {model: Consoles,
                 attributes:  ["name", "id"] ,
                 through: {
                    attributes: [],
                },
                },
                {model: Developers,
                 attributes:  ["name", "id"] ,
                 through: {
                    attributes: [],
                },
                } ],
           
        }).then(r => {
            console.log(r)
            return r
        }).catch(error => next(error))
    }

   
        Promise.all([getApiInfo(), getDbInfo()])
        .then(r => {
            const [apiInfo, dbInfo] = r;
            const info = apiInfo.concat(dbInfo);
            res.send(info)
        }).catch(error => next(error))
      
}

async function addVideogames(req, res, next){
   try {
    let { name, description, developers, year, consoles, image, active, createInDb} = req.body;

    let newGame = await Videogames.create({
        name, description, year, image, active, createInDb
    })

    let dev = await Developers.findAll({
        where: {name: developers}
    })
    
    let cons = await Consoles.findAll({
        where: {name: consoles}
    })

    newGame.addDevelopers(dev)
    newGame.addConsoles(cons)
    res.send(newGame)
   } catch (error) {
    next(error)
   }
}

async function updateGame(req, res, next){
    const id = req.params.id;
    let body = req.body;
    
    await Videogames.update(body,{
        where: {
            id
        }
    })

    res.send("Videojuego actualizado exitosamente")
}

const gameDelete = (req, res, next) => {
    const id = req.params.id;
    return Videogames.destroy({
        where: {
            id
        }
    }).then(() => {res.status(200).send("Videojuego eliminado con éxito")})
    .catch(error => next(error))
}




module.exports = {
    getAllGames,
    addVideogames,
    gameDelete, 
    updateGame
}