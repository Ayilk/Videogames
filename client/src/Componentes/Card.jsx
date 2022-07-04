import React from "react";
import '../Estilos/Card.css'

export default function Card({name, image}){
    return(
        <div className="contenedor">
            <div >{name}</div>
            <div>
                <img 
                    src={image} 
                    alt="Imagen"
                    width="200px"
                    height="200px" 
                /> 
            </div>
        </div>
    )
}