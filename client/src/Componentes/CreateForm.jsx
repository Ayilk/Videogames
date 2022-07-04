import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getConsoles, getDevelopers, postGame } from '../Redux/Actions';
import Footer from './Footer';
import '../Estilos/CreateForm.css'


export default function CreateForm(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const developers = useSelector( state => state.developers);
    const consoles = useSelector(state => state.consoles);

    const [ input, setInput ] = useState({
        name: "", image: "", consoles: [],  description:"",year:"",
        active: true, developers: []
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
      if (! /\d{4}/.test(input.year)) errors.year = "Introduce un año valido";


      return errors;
    }

    useEffect(()=> {
        dispatch(getConsoles())
        dispatch(getDevelopers())
    },[dispatch])

    useEffect(() => {
      if (
        input.name.length > 0 &&
        input.year.length > 0 && 
        input.description.length > 0 &&
        input.image.length > 0 &&
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

    function handleSelectC(e){
        setInput({
            ...input,
            consoles: [...input.consoles, e.target.value],
          })
        setErrors(validate({
          ...input,
          [e.target.name] : e.target.value
        }))
    }
    function handleSelectD(e){
      setInput({
          ...input,
          
          developers: [...input.developers, e.target.value]
      })
      setErrors(validate({
        ...input,
        [e.target.name] : e.target.value
      }))
  }
    function handleDeleteXC(el) {
      setInput({
        ...input,
        consoles: input.consoles.filter(e=> e !== el),
       
      });
    }
    function handleDeleteXD(el) {
      setInput({
        ...input,
        developers: input.developers.filter(e=> e !== el),
       
      });
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postGame(input))
        alert("Personaje creado");
        setInput({
          name: "", image: "", consoles: [],  description:"",year:"",
          active: true, developers: []
        })
        navigate('/home')
    }

    return (
        <div className="grid-container">
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
            <h1>Agrega un videojuego al listado!!</h1>
            <div className='contenedor-form'>
            <form  className='form' onSubmit={e => handleSubmit(e)}>

                <label className='label'>Nombre</label>
                <input className='input-form' type="text" value={input.name} name="name" placeholder="Nombre" onChange={e => handleChange(e)}/>
                {errors.name && (<p className='error-form'>{errors.name}</p>)}

                <label  className='label'>Description</label>
                {/* <input className='input-form' type='submit' value={input.description} name="description" placeholder="Agrega una descripción" onChange={e => handleChange(e)}/> */}
                <textarea name="description" rows="4" cols="40" value={input.description} placeholder="Agrega una descripción" onChange={e => handleChange(e)}></textarea>
                {errors.description && (<p className='error-form'>{errors.description}</p>)}

                <label  className='label'>Imagen</label>
                <input  className='input-form' type='text' value={input.image} name="image" placeholder="Agrega la URL" onChange={e => handleChange(e)}/>
                {errors.image && (<p className='error-form'>{errors.image}</p>)}

                <label className='label'>Año</label>
                <input  className='input-form' type='number' mix="1900" max="2022" value={input.year} name="year" placeholder="Año" onChange={e => handleChange(e)}/>
                {errors.year && (<p className='error-form'>{errors.year}</p>)}

                <label className='label'>Activo</label><br/>
                <input type="radio" name="active" value={false}/>No activo<br/>
                <input type="radio" name="active" value={true} checked/>Activo<br/>

                <label  className='label'>Consolas</label><br/>
                <select onChange={e => handleSelectC(e)}>
                {
                    consoles.map((console, id) => {
                        return(<option key={id} value={console.name}>{console.name}</option>)
                    })

                }
                {
                    input.consoles.length > 5 ? (<p>Seleccione Máximo 5 Consolas</p>) : null
                }
                </select>
                <div >
                  {input.consoles.map((el) => (
                    <div key={el}>
                      <button type="button" onClick={() => handleDeleteXC(el)}>
                        X
                      </button>
                      <p>{el}</p>
                    </div>
                  ))}
                </div>

                <label  className='label'>Desarrolladores</label>
                <select onChange={e => handleSelectD(e)}>
                {
                    developers.map((develop, id) => {
                        return(<option key={id} value={develop.name}>{develop.name}</option>)
                    })

                }
                {
                    input.developers.length > 5 ? (<p>Seleccione Máximo 5 Desarrolladores</p>) : null
                }
                </select>
                <div >
                  {input.developers.map((el) => (
                    <div key={el}>
                      <button type="button" onClick={() => handleDeleteXD(el)}>
                        X
                      </button>
                      <p>{el}</p>
                    </div>
                  ))}
                </div><br/>
                <button type='submit' disabled={disabled} className="agregar">Agregar videojuego</button>
                <br/>
                <br/>
            </form>
            </div>
            </article>
            <footer className="footer">
                <Footer/>
            </footer>

        </div>
    )
}
