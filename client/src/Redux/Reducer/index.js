import { GET_GAMES } from "../Actions";


const initialState = { //Creamos el estado inicial
    videogames: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_GAMES:
            return {
                ...state,
                videogames: action.payload
            }
        default:
            return state;    
    }
}

export default rootReducer;