import React from "react";
import { useSelector } from "react-redux";

export default function Filters({handleFilterCreated, handleOrderByName, handleOrderByYear, handleFilterConsoles}){
    const allConsoles = useSelector(state => state.consoles);

    return(
        <div>
           <select className="items" onChange={e => handleOrderByYear(e)}>
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
           <select className="items" onChange={e => handleFilterConsoles(e)}>
            <option value="all"> Filtrar por Consola   </option>               
                {allConsoles?.map(c => (
            <option key={c.name} value={c.name}> {c.name} </option>))}
            </select> 
        </div>
    )
}