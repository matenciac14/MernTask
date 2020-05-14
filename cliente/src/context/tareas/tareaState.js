
import React, {useReducer} from 'react'

import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import Tareacontext from './tareaContext';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA

} from '../../types';

const TareaState = props => {
    const initialState = {
        tareas: [            
        { id:1, proyectoId:1, nombre:'Elegir Plataforma', estado:true},
        { id:2, proyectoId:2, nombre:'Elegir Colores', estado:false},
        { id:3, proyectoId:2, nombre:'Elegir frutas', estado:false},
        { id:4, proyectoId:2, nombre:'Elegir balones', estado:false},
        { id:5, proyectoId:3, nombre:'Elegir Plataforma de pago', estado:true},
        { id:6, proyectoId:3, nombre:'Elegir Plataforma de cobro', estado:true},
        { id:7, proyectoId:3, nombre:'Elegir Plataforma de transferencia', estado:true},
        { id:8, proyectoId:4, nombre:'Elegir Hosting', estado:false},
        { id:9, proyectoId:4, nombre:'Elegir dominio', estado:false},
        { id:10, proyectoId:4, nombre:'Elegir mause', estado:false},
        { id:11, proyectoId:4, nombre:'Elegir teclado', estado:false}
        ],
        tareasproyecto: null,
        errortarea: false
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

    return(
        <Tareacontext.Provider
            value = {
                {
                    tareas: state.tareas,
                    tareasproyecto: state.tareasproyecto ,
                    errortarea : state.errortarea,
                    obtenerTareas,
                    agregarTarea,
                    validarTarea,
                    eliminarTarea
                }
            }
        >
            {props.children}
        </Tareacontext.Provider>
    )

}

export default TareaState ;