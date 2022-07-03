import { 
    CLEAR_DETAILS_STATE,
    FILTER_BY_CONSOLE, 
    FILTER_BY_CREATED, 
    FILTER_BY_DEVELOPER, 
    GET_BY_DEV, GET_BY_NAME, 
    GET_BY_YEAR, GET_CONSOLES, 
    GET_DETAIL, 
    GET_DEVELOPERS, 
    GET_GAMES, 
    LOADER_FALSE, 
    LOADER_TRUE, 
    ORDER_BY_NAME,
    ORDER_BY_YEAR 
    } from "../Actions";


const initialState = { //Creamos el estado inicial
    videogames: [],
    allVideogames: [],
    consoles: [],
    developers: [],
    detail: []
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
            let sortedd = action.payload === 'recientes'?
                state.videogames.sort((a,b) => a.year - b.year) : 
                state.videogames.sort((a,b) => b.year - a.year);
            return{
                ...state,
                videogames: sortedd
            } 
        case FILTER_BY_CONSOLE:
            const allVideogames = state.allVideogames;  
            let filtro1 = allVideogames.filter(v => v.consoles.map(c =>c.name).includes(action.payload))   
            let filtro2 = allVideogames.filter(v => v.consoles.includes(action.payload))       
            let filtro = action.payload === "all" ? allVideogames :  filtro1.concat(filtro2)
            return {
                ...state,
                videogames: filtro,
            }  
        case FILTER_BY_DEVELOPER:
            const allVideogamesMore = state.allVideogames;
            let filtro3 = allVideogamesMore.filter(v => v.developers?.map(c =>c.name).includes(action.payload))   
            let filtro4 = allVideogamesMore.filter(v => v.developers.includes(action.payload))       
            let filtro5 = action.payload === "all" ? allVideogames :  filtro3.concat(filtro4)
            return {
                ...state,
                videogames: filtro5,
            }
        case GET_DETAIL:
            return{
                ...state,
                detail: action.payload
            }
        case CLEAR_DETAILS_STATE:            
            return {
                ...state,
                detail: [],
            };
            case LOADER_TRUE:            
            return {
                ...state,
                loader: true,
            };
            case LOADER_FALSE:            
            return {
                ...state,
                loader: false,
            };    
        default:
            return state;    
    }
}

export default rootReducer;