import React from "react";

export default function Filters({handleFilterCreated}){
    return(
        <div>
           <select>
            <option value="recientes">Mas Recientes</option>
            <option value="antiguos">Mas Antiguos</option>
           </select> 
           <select>
            <option value="asc">Consola A-Z</option>
            <option value="des">Consola Z-A</option>
           </select>
           <select className="items" onChange={e => handleFilterCreated(e)}>
            <option value="all">Todos</option>
            <option value="created">Creados</option>
            <option value="api">Existentes</option>
           </select>
        </div>
    )
}