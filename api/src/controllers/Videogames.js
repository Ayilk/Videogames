const { Videogames, Consoles, Developers } = require('../db');
const axios = require('axios'); 
const { BASE_URL, API_KEY, GAMES_URL} = process.env;

function getAllGames(req, res, next) {
   const {name, year, developers} = req.query;

	const getApiInfo = () => {
        return axios.get(`${BASE_URL}${GAMES_URL}${API_KEY}`)
        .then(r => {
            const results1 = r.data.results
            return axios.get(r.data.next)
            .then(r => {
                const results2 = r.data.results
                return axios.get(r.data.next)
                .then(r => {
                    const union = results1.concat(results2).concat(r.data.results)
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
            if(name){
                const nameGame = info.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
                nameGame.length? res.status(200).send(nameGame): res.status(404).send("No está el videojuego")
            }
            if(year){
                const yearGame = info.filter(el => el.year == year)
                yearGame.length? res.status(200).send(yearGame): res.status(404).send("No hay videojuegos con ese año")
            }
            if(developers){
                const devGame = info.filter(el => el.developers.toLowerCase().includes(developers.toLowerCase()))
                devGame.length? res.status(200).send(devGame): res.status(404).send("No hay videojuegos con ese developer")
            }
            else{
                res.send(info)
            }
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
    let { name, description, developers, year, consoles, image, active} = req.body;
    const gameUpdate = await Videogames.findByPk(id);
    const allDevs = await Developers.findAll({
        where: {
            name : developers
        }
    })
    // console.log("Videogames", gameUpdate.__proto__)
    await gameUpdate.setDevelopers(allDevs)
    const allConsoles = await Consoles.findAll({
        where:{
            name: consoles
        }
    })
    await gameUpdate.setConsoles(allConsoles)

    await Videogames.update({ name, description, year, image, active},{
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