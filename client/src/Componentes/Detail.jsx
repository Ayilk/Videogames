import React, { useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearDetailsState, getDetail, trueLoader } from '../Redux/Actions';
import loading from '../imagenes/loading.gif';
import '../Estilos/Detail.css';
import Footer from './Footer';


export default function Detail(props){
    //console.log(props);

    const dispatch = useDispatch();
    const games = useSelector(state => state.detail);
    const loader = useSelector(state => state.loader);

    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id));
        dispatch(clearDetailsState());
        dispatch(trueLoader());
    }, [dispatch, id])

    return(
      <div  class="grid-container">
        <header className="header">
                <Link to='/' className='link-header'>
                <h1>VIDEOGAMES APP</h1>
                </Link>
        </header>
        <nav className="nav">
          <Link to='/home'><button className='volver'>Volver</button></Link>
        </nav> 
        <sidebar className="sidebar"></sidebar>
             
        <article className="main"> 
          {
              games.length > 0 ?(
                <div>
                  <div><img src={games[0].image} alt="Imagen"  width="500px" height="500px" className='imagen-detail' /></div>
                  <div>
                  {games[0].createInDb ? (
                      <span ><b>Creado. ID</b> {games[0].id}</span>                        
                    ) : (
                      <span ><b>ID</b> {games[0].id}</span>
                    )}
                  </div>             
                  <div><b>Nombre:</b> {games[0].name  }</div>  
                  <div><b>Descripción:</b> {games[0].description?games[0].description:null}</div>  
                  <div><b>Año:</b> {games[0].year}</div> 
                  <div><b>Consolas:</b> {games[0].consoles?.map(el => { return(el.name? el.name : el)}).join(", ")}</div>  
                  <div><b>Desarrolladores:</b> {games[0].developers?.map(el => { return(el.name? el.name : el)})}</div> 
                                
                </div>) : loader ?  <div><img className='imagen-loader' src={loading} alt ="loading"/> <h1>Cargando . . .</h1></div> : null 
          }
        </article>  
        <footer className="footer">
                <Footer/>
        </footer>
      
          
      </div>   
    )
}