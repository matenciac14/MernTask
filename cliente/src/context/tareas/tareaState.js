
import React, {useReducer} from 'react';
import TareaReducer from './tareaReducer';
import Tareacontext from './tareaContext';
import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ACTUALIZAR_TAREA,
    TAREA_ACTUAL

} from '../../types';

const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada:null
    }

    //crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //crear las funciones

    //obtener tareas de un proyecto
    const obtenerTareas = async project => {
        try {
            const resultado = await clienteAxios.get('/api/tasks',{params:{project}})
            console.log(resultado)
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tasks
            })
        } catch (error) {
            
        }
    }

    //agregar tarea al proyecto seleccionado
    const agregarTarea = async task =>{
        try {
            const resultado = await clienteAxios.post('/api/tasks',task)
            console.log(resultado)
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.task
    
            }) 
            
        } catch (error) {
            console.log(error.response)
        }     

    }

    //valida y muestra error
    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //elimina tarea por id
    const eliminarTarea = async (id, project) =>{
       try {
         await clienteAxios.delete(`/api/tasks/${id}`,{params:{project}});
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
       } catch (error) {
           console.log(error.response)
       }
    }

    //actualizar tarea
    const actualizarTarea = async task =>{
        try {
            const resultado = await clienteAxios.put(`/api/tasks/${task._id}`,task)
            console.log(resultado)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.task
            })
        } catch (error) {
            console.log(error.response)
        }
        
    }

    // obten tarea a editar
    const guardarTareaActual = task => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: task
        })
    }


    return(
        <Tareacontext.Provider
            value = {
                {
                    tareasproyecto: state.tareasproyecto,
                    errortarea : state.errortarea,
                    tareaseleccionada : state.tareaseleccionada,
                    obtenerTareas,
                    agregarTarea,
                    validarTarea,
                    eliminarTarea,
                    guardarTareaActual,
                    actualizarTarea
                    
                }
            }
        >
            {props.children}
        </Tareacontext.Provider>
    )

}

export default TareaState ;