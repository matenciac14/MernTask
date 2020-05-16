import React,{Fragment, useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

import {CSSTransition, TransitionGroup}from 'react-transition-group';


const ListadoTareas = () => {

const proyectosContext = useContext(proyectoContext);
const {proyecto, eliminarProyecto } = proyectosContext;

const tareasContext = useContext(tareaContext);
const {tareasproyecto} = tareasContext;

    //s no existe un proyecto en nuestro state
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    //destructuring para extraer e proyecto actual
    const [proyectoActual] = proyecto;




    return (
      <Fragment>
        <h2>Proyecto: {proyectoActual.nombre}</h2>
        <ul className="listado-tareas">
            {tareasproyecto.length === 0 ?
            (
                <li className="tarea">No hay tareas</li>
            ): 
                <TransitionGroup>
                    {tareasproyecto.map(tarea =>(
                    <CSSTransition
                        key={tarea.id}
                        timeout={300}
                        classNames="tarea"
                    >
                        <Tarea
                            
                            tarea={tarea}
                        />
                    </CSSTransition>                    
                ))}
                </TransitionGroup>
            }
            
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
