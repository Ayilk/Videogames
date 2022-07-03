import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterByCreated, getGames, orderByName } from '../Redux/Actions';
import Card from './Card';
import Filters from './Filters';
import Paginado from './Paginado';

export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames);

    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(10);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allVideogames.slice(indexOfFirstGame,indexOfLastGame);
    const paginado = (pageNumber) => { setCurrentPage(pageNumber)}
    const [order, setOrder] = useState("");

    useEffect(() =>{
        dispatch(getGames())
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getGames());
    }

    function handleFilterCreated(e){
        dispatch(filterByCreated(e.target.value))
    }

    function handleOrderByName(e){
         e.preventDefault();
         dispatch(orderByName(e.target.value));
         setCurrentPage(1);
         setOrder(`Ordenado ${e.target.value}`)
    }

    return(
        <div class="grid-container">
            <header class="header"><h1>VIDEOGAMES APP</h1></header>
            <nav class="nav">
                <Filters
                   handleFilterCreated={handleFilterCreated}
                   handleOrderByName={handleOrderByName}
                />
            </nav>
            <sidebar class="sidebar">SIDEBAR</sidebar>
            <article class="main"> 
            <Paginado
               gamesPerPage={gamesPerPage}
               allVideogames={allVideogames.length}
               paginado={paginado}
            />
              {
                currentGames?.map(el => {
                    return(
                        <div>
                            <Card 
                                name={el.name}
                                image={el.image}
                                key={el.id}
                            />  
                        </div> 
                    )
                })
              }
            </article>
            <footer class="footer">FOOTER</footer>
            
        </div>
    )
}