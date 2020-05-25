
import React, {useReducer} from 'react';
import TareaReducer from './tareaReducer';
import Tareacontext from './tareaContext';
import { v4 as uuidv4 } from "uuid";

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    ACTUALIZAR_TAREA,
    TAREA_ACTUAL

} from '../../types';

const TareaState = props => {
    const initialState = {
        tareas: [],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada:null
    }

    //crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //crear las funciones

    //obtener tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload : proyectoId
        })
    }

    //agregar tarea al proyecto seleccionado
    const agregarTarea = tarea =>{
        tarea.id = uuidv4();
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea

        })      

    }

    //valida y muestra error
    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //elimina tarea por id
    const eliminarTarea = id =>{
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }
    
    //cambia estado de tarea
    const cambiaEstadoTarea = tarea =>{
        dispatch({
            type:ESTADO_TAREA,
            payload:tarea
        })
    }

    // obten tarea a editar
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    //actualizar tarea
    const actualizarTarea = tarea =>{
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    return(
        <Tareacontext.Provider
            value = {
                {
                    tareas: state.tareas,
                    tareasproyecto: state.tareasproyecto ,
                    errortarea : state.errortarea,
                    tareaseleccionada : state.tareaseleccionada,
                    obtenerTareas,
                    agregarTarea,
                    validarTarea,
                    eliminarTarea,
                    cambiaEstadoTarea,
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