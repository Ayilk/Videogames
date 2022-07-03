import axios from 'axios';

export const GET_GAMES = "GET_GAMES";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";



export function getGames(){
    return async function(dispatch){
        var json= await axios("/videogames") //Esta es la conexióm con el back
        return dispatch({
            type: GET_GAMES,
            payload: json.data
        })
    }
}

export function filterByCreated(payload){
    return{
        type: FILTER_BY_CREATED,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}