import React,{Fragment} from 'react';
import Tarea from './Tarea';

const ListadoTareas = () => {

    const tareasProyecto =[
        { id:'#1', nombre:'Elegir Plataforma', estado:true},
        { id:'#2', nombre:'Elegir Colores', estado:false},
        { id:'#3', nombre:'Elegir Plataforma de pago', estado:true},
        { id:'#4', nombre:'Elegir Hosting', estado:false}
    ];


    return (
      <Fragment>
        <h2>Proyecto: Tienda Virtual</h2>
        <ul className="listado-tareas">
            {tareasProyecto.length === 0 ?
            (
                <li className="tarea">No hay tareas</li>
            ): tareasProyecto.map(tarea =>(
                <Tarea
                key={tarea.id}
                    tarea={tarea}
                />
            ))}
        </ul>
        <button
            type='button'
            className='btn btn-primario'
        >Eliminar Proyecto &times;</button>
      </Fragment>
    );
}

export default ListadoTareas
