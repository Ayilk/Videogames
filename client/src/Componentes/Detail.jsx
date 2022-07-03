import React, { useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearDetailsState, getDetail, trueLoader } from '../Redux/Actions';
import loading from '../imagenes/loading.gif';
//import '../Estilos/Detail.css';


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
      <div className='contenedor-detail'>
          <Link to='/home'><button className='volver'>Volver</button></Link>
          {
              games.length > 0 ?(
                <div>
                    {games[0].createInDb ? (
                      <span >Creado # {games[0].id}</span>                        
                    ) : (
                      <span ># {games[0].id}</span>
                    )}
              
                  <div className='imagen-detail'><img src={games[0].image} alt="Imagen"  width="500px" height="500px"/></div>
                  <div>{games[0].name  }</div>  
                  <div>{games[0].description?games[0].description:null}</div>  
                  <div>{games[0].year}</div> 
                  <div>{games[0].consoles?.map(el => {
                    return(el.name? el.name : el)
                  }).join(", ")}</div>  
                   <div>{games[0].developers?.map(el => {
                    return(el.name? el.name : el)
                   })}</div> 
                                
                </div>) : loader ?  <div><img className='imagen-loader' src={loading} alt ="loading"/> <h1>Cargando . . .</h1></div> : null 
          }
      
          
      </div>   
    )
}