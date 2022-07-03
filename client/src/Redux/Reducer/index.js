import { FILTER_BY_CREATED, GET_BY_DEV, GET_BY_NAME, GET_BY_YEAR, GET_CONSOLES, GET_DEVELOPERS, GET_GAMES, ORDER_BY_NAME, ORDER_BY_YEAR } from "../Actions";


const initialState = { //Creamos el estado inicial
    videogames: [],
    allVideogames: [],
    consoles: [],
    developers: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_GAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        case FILTER_BY_CREATED:
            const allVideogamesPlus = state.allVideogames;
            const filter = action.payload === 'created'?
            allVideogamesPlus.filter(el => el.createdInDb):
            allVideogamesPlus.filter(el => !el.createdInDb)
            return{
                ...state,
                videogames: action.payload === 'all'? state.allVideogames : filter
            }  
        case ORDER_BY_NAME:
            let sorted = action.payload === 'asc'?
                     state.videogames.sort(function(a,b){
                         if(a.name > b.name){return 1}
                         if(b.name > a.name){return -1}
                         return 0
                     }) :
                     state.videogames.sort(function(a,b){
                        if(a.name > b.name){return -1}
                        if(b.name > a.name){return 1}
                        return 0
                     })     
                return{
                    ...state,
                    videogames: sorted
                }  
        case GET_BY_NAME:
            return{
                ...state,
                videogames: action.payload
            }  
        case GET_BY_YEAR:
            return{
                ...state,
                videogames: action.payload
            } 
        case GET_BY_DEV:
            return{
                ...state,
                videogames: action.payload
            }   
        case GET_CONSOLES:
            return{
                ...state,
                consoles: action.payload
            }                       
        case GET_DEVELOPERS:
            return{
                ...state,
                developers: action.payload
            }    
        case ORDER_BY_YEAR:
            let sortedd = action.payload === 'asc'?
                state.videogames.sort((a,b) => a.attack - b.attack) : 
                state.videogames.sort((a,b) => b.attack-a.attack);
                return{
                    ...state,
                    videogames: sortedd
                } 

        default:
            return state;    
    }
}

export default rootReducer;