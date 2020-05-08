import React,{useReducer} from 'react'

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

//types
import {
    FORMUALIO_PROYECTO,
    OBTENER_PROYECTOS
} from '../../types';


const proyectos =[
    { id:1, nombre:'Tienda Virtual' },
            { id:2, nombre:'Internet' },
            { id:3, nombre:'Diseno de sitio web' },
            { id:4, nombre:'MERN'}
];

const ProyectoState = props => {
    const initialState = {
        proyectos : [],
        formulario : false
        
    }
    //dispatch para ejecutar acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)
    
    
    // funciones para realizar el CRUD 
    const mostrarFormulario = ()=>{
        dispatch({
            type: FORMUALIO_PROYECTO
        })
    }

    //get the projets
    const obtenerProyectos = proyectos =>{
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario : state.formulario,
                mostrarFormulario
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}
export default ProyectoState;