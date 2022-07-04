import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getConsoles, getDevelopers, postGame } from '../Redux/Actions';


export default function CreateForm(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const devs = useSelector( state => state.developers);
    const consoles = useSelector(state => state.consoles);

    const [ input, setInput ] = useState({
        name: "", image: "", consoles: [],  description:"",year:"",
        active:"", developers: []
    })
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);

    const validate = input => {
      let errors = {};
      if (!input.name) errors.name = "Nombre Requerido";
      if (!input.image) errors.image = "Imagen Requerida";
      if (!input.consoles) errors.consoles = "Al menos una consola Requerida";
      if (!input.developers) errors.developers = "Al menos un Desarrollador Requerido";
      if (!input.description) errors.description = "Descripción Requerida";
      if (!input.year) errors.year = "Año Requerido";
      if (!input.active) errors.name = "El campo activo es Requerido";
      
            
      return errors;
    }

    useEffect(()=> {
        dispatch(getConsoles())
        dispatch(getDevelopers())
    },[dispatch])

    useEffect(() => {
      if (
        input.name.length > 0 &&
        input.description.length > 0 &&        
        input.consoles.length < 5 && 
        input.developers.length < 3 &&       
        !errors.hasOwnProperty("year") &&
        !errors.hasOwnProperty("active") &&
        !errors.hasOwnProperty("description") &&
        !errors.hasOwnProperty("developers") &&
        !errors.hasOwnProperty("consoles") &&
        !errors.hasOwnProperty("image")
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, [errors, input, setDisabled]);

    function handleChange(e){
        setInput({
          ...input,
          [ e.target.name ] : e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
          })
        );
    }

    function handleSelect(e){
        setInput({
            ...input,
            consoles: [...input.consoles, e.target.value],
            developers: [...input.developers, e.target.value]
        })
        setErrors(validate({
          ...input,
          [e.target.name] : e.target.value
        }))
    }
    function handleDeleteX(el) {
      setInput({
        ...input,
        consoles: input.consoles.filter(e=> e !== el),
        developers: input.devs.filter(e => e !== el),
      });
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postGame(input))
        alert("Personaje creado");
        setInput({
          name: "", image: "", consoles: [],  description:"",year:"",
          active:"", developers: []
        })
        navigate('/home')
    }

    return ( 
        <div className='contenedor-creation'>
          <Link to='/home'><button className='volver'>Volver</button></Link>
            <h1>Agrega un videojuego al listado!!</h1>
            <div className='contenedor-form'>
            <form  className='form' onSubmit={e => handleSubmit(e)}>
                
                <label className='label'>Nombre</label>
                <input className='input-form' type="text" value={input.name} name="name" placeholder="Nombre" onChange={e => handleChange(e)}/>
                {errors.name && (<p className='error-form'>{errors.name}</p>)}

                <label  className='label'>Description</label>
                <input className='input-form' type='text' vallue={input.description} name="hp" placeholder="Agrega una descripción" onChange={e => handleChange(e)}/>
                {errors.hp && (<p className='error-form'>{errors.description}</p>)} 

                <label  className='label'>Imagen</label>
                <input  className='input-form' type='number' vallue={input.image} name="attack" placeholder="Agrega la URL" onChange={e => handleChange(e)}/>
                {errors.attack && (<p className='error-form'>{errors.image}</p>)}
               
                
                
                <label  className='label'>Consoles</label>
                <select onChange={e => handleSelect(e)}>
                {
                    consoles.map((console, id) => {
                        return(<option key={id} value={console.name}>{console.name}</option>)
                    })
                    
                }
                {
                    input.consoles.length > 2 ? (<p>Seleccione Máximo 5 Consolas</p>) : null
                }
                </select>
                <div >
                  {input.consoles.map((el) => (
                    <div key={el}>
                      <button type="button" onClick={() => handleDeleteX(el)}>
                        X
                      </button>
                      <p>{el}</p>
                    </div>
                  ))}
                </div>  
                <button type='submit' disabled={disabled}>Agregar nuevo videojuego al listado</button>
            </form>
            </div>
           
        </div>
    )
}
