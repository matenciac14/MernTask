//types
import {
    FORMUALIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTOS,
    VALIDAR_FORMULARIO
} from '../../types';

export default (state, action) =>{

    switch(action.type){
        case FORMUALIO_PROYECTO:
            return{
                ...state,
                formulario:true
            }
        case OBTENER_PROYECTOS:
            return{
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTOS:
            return{
                ...state,
                proyectos: [...state.proyectos, action.payload],
                formulario: false,
                errorformulario: false


            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario: true
            }

        default:
            return state;
    }

   

}