import React,{useState , useContext, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {
const proyectosContext = useContext(proyectoContext);
const {proyecto } = proyectosContext;

//obtener funcion de context de tarea
const tareasContext = useContext(tareaContext);
const {agregarTarea, validarTarea, errortarea, obtenerTareas,tareaseleccionada, actualizarTarea} = tareasContext;

//detectar tarea seleccionada
 useEffect(() => {
   if(tareaseleccionada !== null){
       guardarTarea(tareaseleccionada)
   }else{
       guardarTarea({
           nombre:''
       })
   }
     
 }, [tareaseleccionada])

//state local
    const [tarea, guardarTarea]= useState({
        nombre: ''
    })

    //extraer nombre del proyecto
    const {nombre} = tarea;

    //si no existe un proyecto en nuestro state
    if(!proyecto) return null;

    //destructuring para extraer e proyecto actual
    const [proyectoActual] = proyecto;

    //leer los valores
    const handlechange = e =>{
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();

        //validarform
        if(nombre.trim()===''){
            validarTarea();
            return;
        }
        // validacion para editar o agegar
        if(tareaseleccionada === null){
            //agregar nueva tarea
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false
            agregarTarea(tarea);
        }else{
            actualizarTarea(tarea);
        }

        

        //descargar tareas del proyecto actual
        obtenerTareas(proyectoActual.id)

        //reiniciar el form
        guardarTarea({
            nombre: ''
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
                        name='nombre'
                        value={nombre}
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
            {errortarea ? <p className="mensaje error"> el nombre d ela tarea es obligatorio</p> :null}
        </div>
    )
}

export default FormTarea
