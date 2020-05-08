//types
import {FORMUALIO_PROYECTO} from '../../types'

export default (state, action) =>{
    switch(action.type){
        case FORMUALIO_PROYECTO:
            return{
                ...state,
                formulario:true
            }

        default:
            return state;
    }
}