
import React, {useReducer} from 'react'

import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import Tareacontext from './tareaContext';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA

} from '../../types';

const TareaState = props => {
    const initialState = {
        tareas: [            
        { proyectoId:1, nombre:'Elegir Plataforma', estado:true},
        { proyectoId:2, nombre:'Elegir Colores', estado:false},
        { proyectoId:2, nombre:'Elegir frutas', estado:false},
        { proyectoId:2, nombre:'Elegir balones', estado:false},
        { proyectoId:3, nombre:'Elegir Plataforma de pago', estado:true},
        { proyectoId:3, nombre:'Elegir Plataforma de cobro', estado:true},
        { proyectoId:3, nombre:'Elegir Plataforma de transferencia', estado:true},
        { proyectoId:4, nombre:'Elegir Hosting', estado:false},
        { proyectoId:4, nombre:'Elegir dominio', estado:false},
        { proyectoId:4, nombre:'Elegir mause', estado:false},
        { proyectoId:4, nombre:'Elegir teclado', estado:false}
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

    return(
        <Tareacontext.Provider
            value = {
                {
                    tareas: state.tareas,
                    tareasproyecto: state.tareasproyecto ,
                    errortarea : state.errortarea,
                    obtenerTareas,
                    agregarTarea,
                    validarTarea
                }
            }
        >
            {props.children}
        </Tareacontext.Provider>
    )

}

export default TareaState ;