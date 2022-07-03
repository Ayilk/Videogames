import { FILTER_BY_CREATED, GET_GAMES } from "../Actions";


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
        default:
            return state;    
    }
}

export default rootReducer;