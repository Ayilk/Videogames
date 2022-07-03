import React from "react";
import './Estilos/Paginado.css';


export default function Paginado({gamesPerPage, allVideogames, paginado, currentPage}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allVideogames / gamesPerPage) ; i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className="ul">
      <div className="div">
          <button 
            className="boton-paginado"
            disabled={currentPage > 1 ? false : true}
            onClick={() => paginado(1)}
          >
          &lt;&lt;
          </button>

          <button
            className="boton-paginado"
            disabled={currentPage > 1 ? false : true}
            onClick={() => paginado(currentPage - 1)}
          >
          &lt; 
          </button>

            {pageNumbers &&
              pageNumbers.map((number) => (
              
                <li className="li" key={number}>
                  <a className="link" onClick={() => paginado(number)}>{number}</a>
                </li>
                
              ))}

            <button
            className="boton-paginado"
            disabled={currentPage < pageNumbers.length ? false : true}
            onClick={() => paginado(currentPage + 1)}
          >
          &gt;
          </button>
          
            <button
            className="boton-paginado"
            disabled={currentPage < pageNumbers.length ? false : true}
            onClick={() => paginado(pageNumbers.length)}
          >
          &gt;&gt;
          </button>

      </div>   
    </ul>
  );
}