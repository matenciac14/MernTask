import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Proyecto = ({project}) => {
//state del proyecto 
const proyectosContext = useContext(proyectoContext);
const {proyectoActual } = proyectosContext;

//obtener funcion de context de tarea
const tareasContext = useContext(tareaContext);
const {obtenerTareas} = tareasContext;

    const seleccionarProyecto = id => {
        proyectoActual(id); //fijamos proyecto actual
        obtenerTareas(id); //se filtan las tareas
    }



    return (
        <li>
            <button
                type='button'
                className='btn btn-blank p-2'
                onClick={() => seleccionarProyecto(project._id)}
            >
                {project.name}
            </button>
        </li>
    )
}

export default Proyecto
