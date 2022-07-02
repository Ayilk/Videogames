import axios from 'axios';

export const GET_GAMES = "GET_GAMES";


export function getGames(){
    return async function(dispatch){
        var json= await axios("/videogames") //Esta es la conexióm con el back
        return dispatch({
            type: GET_GAMES,
            payload: json.data
        })
    }
}