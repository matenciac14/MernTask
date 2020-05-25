import React,{useContext} from 'react';
import tareaContext from '../../context/tareas/tareaContext';
import proyectoContext from '../../context/proyectos/proyectoContext';

const Tarea = ({task}) => {

//obtener funcion de context de tarea
const tareasContext = useContext(tareaContext);
const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;

//context proyecto
const proyectosContext = useContext(proyectoContext);
const {project } = proyectosContext;

const [proyectoActual] = project;



const tareaEliminar = id =>{
    eliminarTarea(id,proyectoActual._id);
    obtenerTareas(proyectoActual.id);
}  

const cambiarEstado = task =>{
     if(task.state){
        task.state = false;
     }else{
        task.state = true;
     }
     actualizarTarea(task)
}

const seleccionarTarea= task =>{
    guardarTareaActual(task)
}


    return (
       <li className="tarea sombra">
           <p>{task.name} </p>
           <div className="estado">
               {task.state ? 
               (
                   <button type='button' className='completo' onClick={() => cambiarEstado(task)}>Completo</button>
               ):
               (
                <button type='button' className='incompleto' onClick={() => cambiarEstado(task)}>Incompleto</button>
                )
               }
           </div>
           <div className="acciones">
               <button
                type='button'
                className='btn btn-primario'
                onClick={()=> seleccionarTarea(task)}
               >Editar</button>

               <button
                 type='button'
                 className='btn btn-segundario'
                 onClick={() => tareaEliminar(task._id)}
               >Eliminar</button>
           </div>
       </li>
    )
}

export default Tarea
