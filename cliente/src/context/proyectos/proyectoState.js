import React,{useReducer} from 'react';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import clienteAxios from '../../config/axios';

//types
import {
    FORMUALIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR

} from '../../types';




const ProyectoState = props => {
    const initialState = {
        projects : [],
        formulario : false,
        errorformulario:false,
        project : null,
        mensaje:null
        
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
    const obtenerProyectos = async () =>{
        try {
            const resultado = await clienteAxios.get('/api/projects');

            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.projects
            })
        } catch (error) {
            const alerta ={
                msg:"Error, can't delete",
                categoria: 'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }
    }

    // aregar proyecto
    const  agregarProyecto = async (project) =>{
        try {
            const resultado = await clienteAxios.post('/api/projects', project);
            console.log(resultado);
            dispatch({
                type: AGREGAR_PROYECTOS,
                payload : resultado.data
            })
        } catch (error) {
            const alerta ={
                msg:"Error, can't delete",
                categoria: 'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }

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
    const eliminarProyecto = async (proyectoId) =>{
        try {
            await clienteAxios.delete(`/api/projects/${proyectoId}`);
            dispatch({
                type:ELIMINAR_PROYECTO,
                payload: proyectoId

            })
        } catch (error) {
            const alerta ={
                msg:"Error, can't delete",
                categoria: 'alerta-error'
            }
            dispatch({
                type:PROYECTO_ERROR,
                payload:alerta
            })
        }
    }

    return(
        <proyectoContext.Provider
            value={{
                projects: state.projects,
                formulario : state.formulario,
                errorformulario : state.errorformulario,
                project: state.project,
                mensaje:state.mensaje,
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