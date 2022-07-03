import { FILTER_BY_CREATED, GET_GAMES, ORDER_BY_NAME } from "../Actions";


const initialState = { //Creamos el estado inicial
    videogames: [],
    allVideogames: []
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
        default:
            return state;    
    }
}

export default rootReducer;