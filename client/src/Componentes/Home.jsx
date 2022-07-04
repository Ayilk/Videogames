import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterByConsole, filterByCreated, filterByDeveloper, getConsoles, 
         getDevelopers, getGames, orderByName, orderByYear, trueLoader } from '../Redux/Actions';
import Card from './Card';
import Filters from './Filters';
import Paginado from './Paginado';
import SearchBar from './SearcBar';
import loading from '../imagenes/loading.gif';
import '../Estilos/Home.css';
import Footer from './Footer';

export default function Home(){
    const dispatch = useDispatch();
    const allVideogames = useSelector(state => state.videogames);
    const loader = useSelector(state => state.loader);

    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(9);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allVideogames.slice(indexOfFirstGame,indexOfLastGame);
    const paginado = (pageNumber) => { setCurrentPage(pageNumber)}
    const [order, setOrder] = useState("");

    useEffect(() =>{
        dispatch(trueLoader())
        dispatch(getGames())
        dispatch(getConsoles())
        dispatch(getDevelopers())
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(trueLoader());
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

    function handleOrderByYear(e){
        e.preventDefault();
        dispatch(orderByYear(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleFilterConsoles(e){
        e.preventDefault();
        dispatch(filterByConsole(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleFilterDevelopers(e){
        e.preventDefault();
        dispatch(filterByDeveloper(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }
    return(
        <div class="grid-container">
            <header className="header">
                <Link to='/' className='link-header'>
                <h1>VIDEOGAMES APP</h1>
                </Link>
            </header>
            <nav className="nav">
                <div className='bars'>
                    <SearchBar/>
                    <Link to="/new-videogame">
                    <button className='crear-videogame'> Crea un nuevo videojuego</button>
                    </Link>    
                    
                    <Filters
                    handleFilterCreated={handleFilterCreated}
                    handleOrderByName={handleOrderByName}
                    handleOrderByYear={handleOrderByYear}
                    handleFilterConsoles={handleFilterConsoles}
                    handleFilterDevelopers={handleFilterDevelopers}
                    />
                    <button className='recargar' onClick= {e => handleClick(e)}>
                        <h3 className='texto-r'>Recargar</h3>
                    </button>
                </div>
                
            </nav>
            <sidebar className="sidebar">SIDEBAR</sidebar>
            
            <article className="main"> 
            <Paginado
               gamesPerPage={gamesPerPage}
               allVideogames={allVideogames.length}
               paginado={paginado}
               currentPage={currentPage}
            />

            {loader? <div><img className='imagen-loader' src={loading} alt ="loading" /> <h1>Cargando . . .</h1></div>:
                <div className='cards'>
                {
                    currentGames?.map(el => {
                        return(
                            <div className='card-u'>
                                <Link to={"/home/"+ el.id} className="name-card">
                                <Card 
                                    name={el.name}
                                    image={el.image}
                                    key={el.id}
                                />  
                                </Link>
                            </div> 
                        )
                    })
                }
                </div>
            } 

            </article>
            <footer className="footer">
                <Footer/>
            </footer>
            
        </div>
    )
}