
import React, {useReducer} from 'react'

import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import Tareacontext from './tareaContext';

import {TAREAS_PROYECTO} from '../../types';

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
        tareasproyecto: null
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

    return(
        <Tareacontext.Provider
            value = {
                {
                    tareas: state.tareas,
                    tareasproyecto: state.tareasproyecto ,
                    obtenerTareas
                }
            }
        >
            {props.children}
        </Tareacontext.Provider>
    )

}

export default TareaState ;