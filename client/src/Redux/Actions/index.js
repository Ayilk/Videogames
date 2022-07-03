import axios from 'axios';

export const GET_GAMES = "GET_GAMES";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_BY_YEAR = "GET_BY_YEAR";
export const GET_BY_DEV = "GET_BY_DEV";
export const GET_CONSOLES = "GET_CONSOLES";
export const GET_DEVELOPERS = "GET_DEVELOPERS";
export const ORDER_BY_YEAR = "ORDER_BY_YEAR";
export const FILTER_BY_CONSOLE = "FILTER_BY_CONSOLE";



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

export function getByName(name){
    return async function(dispatch){
        var json = await axios.get("/videogames?name="+ name);
        return dispatch({
            type: GET_BY_NAME,
            payload: json.data
        })
    }
}

export function getByYear(year){
    return async function(dispatch){
        var json = await axios.get("/videogames?year="+ year);
        return dispatch({
            type: GET_BY_YEAR,
            payload: json.data
        })
    }
}

export function getByDev(developer){
    return async function(dispatch){
        var json = await axios.get("/videogames?developer="+ developer);
        return dispatch({
            type: GET_BY_DEV,
            payload: json.data
        })
    }
}

export function getConsoles(){
    return async function(dispatch){
        var json = await axios.get("/consoles");
        return dispatch({
            type: GET_CONSOLES,
            payload: json.data
        })
    }
}

export function getDevelopers(){
    return async function(dispatch){
        var json = await axios.get("/developers");
        return dispatch({
            type: GET_DEVELOPERS,
            payload: json.data
        })
    }
}

export function orderByYear(payload){
    return{
        type: ORDER_BY_YEAR,
        payload
    }
}

export function filterByConsole(payload){
    return{
        type: FILTER_BY_CONSOLE,
        payload
    }
}