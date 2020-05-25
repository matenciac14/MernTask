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
                projects: action.payload
            }
        case AGREGAR_PROYECTOS:
            return{
                ...state,
                projects: [...state.projects, action.payload],
                formulario: false,
                errorformulario: false


            }
        case VALIDAR_FORMULARIO:
            return{
                ...state,
                errorformulario: true
            }
        case PROYECTO_ACTUAL:
            return{
                ...state,
                project: state.projects.filter(project => project._id === action.payload),
                
            }
        case ELIMINAR_PROYECTO:
            return{
                ...state,
                projects:state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        case PROYECTO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }

        default:
            return state;
    }

   

}