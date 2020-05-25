import React,{useState , useContext, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {
const proyectosContext = useContext(proyectoContext);
const {project } = proyectosContext;

//obtener funcion de context de tarea
const tareasContext = useContext(tareaContext);
const {agregarTarea, validarTarea, errortarea, obtenerTareas,tareaseleccionada, actualizarTarea} = tareasContext;

//detectar tarea seleccionada
 useEffect(() => {
   if(tareaseleccionada !== null){
       guardarTarea(tareaseleccionada)
   }else{
       guardarTarea({
           name:''
       })
   }
     
 }, [tareaseleccionada])

//state local
    const [task, guardarTarea]= useState({
        name: ''
    })

    //extraer nombre 
    const {name} = task;

    //si no existe un proyecto en nuestro state
    if(!project) return null;

    //destructuring para extraer e proyecto actual
    const [proyectoActual] = project;

    //leer los valores
    const handlechange = e =>{
        guardarTarea({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();

        //validarform
        if(name.trim()===''){
            validarTarea();
            return;
        }
        // validacion para editar o agegar
        if(tareaseleccionada === null){
            //agregar nueva tarea
            task.project = proyectoActual._id
            agregarTarea(task);
        }else{
            actualizarTarea(task);
        }

        

        //descargar tareas del proyecto actual
        obtenerTareas(proyectoActual.id)

        //reiniciar el form
        guardarTarea({
            name: ''
        })

    }



    return (
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input 
                        type="text" 
                        className='input-text' 
                        placeholder='Nombre-tarea...' 
                        name='name'
                        value={name}
                        onChange={handlechange} 
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className='btn btn-primario btn-submit btn-block'
                        value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error"> el nombre de la tarea es obligatorio</p> :null}
        </div>
    )
}

export default FormTarea
