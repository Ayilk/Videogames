import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByDev, getByName, getByYear } from '../Redux/Actions';
//import '../Estilos/SearchBar.css'

export default function SearchBar(){
    const dispatch = useDispatch();
    const [ name, setName ] = useState('');
    const [ year, setYear ] = useState('');
    const [ developer, setDeveloper ] = useState('');


    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value);
        setYear(e.target.value);
        setDeveloper(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getByName(name));
        dispatch(getByYear(year));
        dispatch(getByDev(developer))
    }

    return(
        <form className='searchContainer'>
           <div className='searchBox'>
            <input 
               className='searchBox'
               type='text'
               placeholder='Nombre'
               onChange={e => handleInputChange(e)}
            />
            <button 
               className='searchButton'
               type='submit'
               onClick={e => handleSubmit(e)} 
            >
               Buscar 
            </button>     
        </div>
        </form>
        
    )
}