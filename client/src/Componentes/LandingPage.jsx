import React from "react";
import { Link } from "react-router-dom";
import '../Estilos/LandingPage.css'

export default function LandingPage(){
    return(
        <div className="landing">
            <div className="ingresar">
                <Link to='/home'>
                    <button className="boton-ingresar"> <h3>INGRESAR</h3> </button>
                </Link>
            </div>            
        </div>
    )
}