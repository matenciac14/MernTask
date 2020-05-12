import React,{useReducer} from 'react';
import { v4 as uuidv4 } from "uuid";

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

//types
import {
    FORMUALIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO
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
        errorformulario:false,
        proyecto : null
        
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

    //selecciondel proyecto cuando el ussuario click
    const proyectoActual = proyectoId =>{
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })

    }

    //eliminar proyecto
    const eliminarProyecto = (proyectoId) =>{
        dispatch({
            type:ELIMINAR_PROYECTO,
            payload: proyectoId

        })
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario : state.formulario,
                errorformulario : state.errorformulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}
export default ProyectoState;