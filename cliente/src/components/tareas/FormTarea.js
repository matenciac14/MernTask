import React,{useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';

const FormTarea = () => {
const proyectosContext = useContext(proyectoContext);
const {proyecto } = proyectosContext;

    //s no existe un proyecto en nuestro state
    if(!proyecto) return null;

    //destructuring para extraer e proyecto actual
    const [proyectoActual] = proyecto;

    return (
        <div className="formulario">
            <form action="">
                <div className="contenedor-input">
                    <input type="text" className='input-text' placeholder='Nombre-tarea...' name='nombre' />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className='btn btn-primario btn-submit btn-block'
                        value='Agregar Tarea'
                    />
                </div>
            </form>
        </div>
    )
}

export default FormTarea
