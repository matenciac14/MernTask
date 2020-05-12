import React,{Fragment, useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';

const ListadoTareas = () => {
const proyectosContext = useContext(proyectoContext);
const {proyecto, eliminarProyecto } = proyectosContext;

    //s no existe un proyecto en nuestro state
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    //destructuring para extraer e proyecto actual
    const [proyectoActual] = proyecto;

    const tareasProyecto =[
        { id:'#1', nombre:'Elegir Plataforma', estado:true},
        { id:'#2', nombre:'Elegir Colores', estado:false},
        { id:'#3', nombre:'Elegir Plataforma de pago', estado:true},
        { id:'#4', nombre:'Elegir Hosting', estado:false}
    ];


    return (
      <Fragment>
        <h2>Proyecto: {proyectoActual.nombre}</h2>
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
            onClick={() => eliminarProyecto(proyectoActual.id)}
        >Eliminar Proyecto &times;</button>
      </Fragment>
    );
}

export default ListadoTareas
