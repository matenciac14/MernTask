import React,{useReducer} from 'react';
import { v4 as uuidv4 } from "uuid";

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

//types
import {
    FORMUALIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO
} from '../../types';




const ProyectoState = props => {
    const proyectos =[
        { id:1, nombre:'Tienda Virtual' },
                { id:2, nombre:'Internet' },
                { id:3, nombre:'Diseno de sitio web' },
                { id:4, nombre:'MERN'}
    ];

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario:false
        
    }
    //dispatch para ejecutar acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)
    
    
    // funciones para realizar el CRUD 
    const mostrarFormulario = ()=>{
        dispatch({
            type: FORMUALIO_PROYECTO
        })
    }

    //obtener proyectos
    const obtenerProyectos = () =>{
        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        })
    }

    // aregar proyecto
    const  agregarProyecto = (proyecto) =>{
        proyecto.id = uuidv4();
        //insertar proyeto al state
        dispatch({
            type: AGREGAR_PROYECTOS,
            payload : proyecto
        })

    }

    //validar formulario por errores
    const  mostrarError = () =>{
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario : state.formulario,
                errorformulario : state.errorformulario,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}
export default ProyectoState;