import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGames } from '../Redux/Actions';
import Card from './Card'

export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames);

    useEffect(() =>{
        dispatch(getGames())
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getGames());
    }

    return(
        <div class="grid-container">
            <header class="header"><h1>VIDEOGAMES APP</h1></header>
            <nav class="nav">NAV</nav>
            <sidebar class="sidebar">SIDEBAR</sidebar>
            <article class="main"> 
              {
                allVideogames && allVideogames.map(el => {
                    return(
                        <Card 
                           name={el.name}
                           image={el.image}
                           key={el.id}
                        />   
                    )
                })
              }
            </article>
            <footer class="footer">FOOTER</footer>
            
        </div>
    )
}