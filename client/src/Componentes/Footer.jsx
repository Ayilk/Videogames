import React from "react";
import github from "../imagenes/logoGit.png";
import linkedIn from "../imagenes/logoLinkedin.png";
import '../Estilos/Footer.css'

export default function Footer(){
    return(
        <div >
            <div >Contacto</div>
            <div className="contenedor-footer">
            <a href="https://github.com/Ayilk" >
                    <img src={github} alt="Github" width="60px" heigth="60px" className="img-contacto"/>
            </a>
            <a href="www.linkedin.com/in/srangelh">
                <img src={linkedIn} alt="LinkedIn" width="40px" heigth="40px" className="img-contacto"/>
            </a>
            </div>
        </div>
    )
}