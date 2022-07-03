import React from "react";

export default function Filters({handleFilterCreated, handleOrderByName, handleOrderByYear}){
    return(
        <div>
           <select className="items" onChange={e => handleOrderByName(e)}>
            <option value="recientes">Mas Recientes</option>
            <option value="antiguos">Mas Antiguos</option>
           </select> 
           <select className="items" onChange={e => handleOrderByName(e)}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
           </select>
           <select className="items" onChange={e => handleFilterCreated(e)}>
            <option value="all">Todos</option>
            <option value="created">Creados</option>
            <option value="api">Existentes</option>
           </select>
        </div>
    )
}