import React from "react";

export default function Card({name, image}){
    return(
        <div>
            <div>{name}</div>
            <div>
                <img 
                    src={image} 
                    alt="Imagen"
                    width="200px"
                    height="250px" 
                /> 
            </div>
        </div>
    )
}