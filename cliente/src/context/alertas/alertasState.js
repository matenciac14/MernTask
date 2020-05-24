import React, {useReducer} from 'react';
import alertasReducer from './alertasReducer';
import alertasContext from './alertasContext';

//types
import{
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types';

const AlertaState = props => {
    const initialState = {
        alerta : null
    }

    const [state, dispatch] = useReducer(alertasReducer, initialState)
    const mostrarAlerta = (msg, categoria) =>{
        dispatch({
            type: MOSTRAR_ALERTA,
            payload:{
                msg,
                categoria
            }
        });

        setTimeout(() => {
            dispatch({
                type:OCULTAR_ALERTA
            })
        }, 5000);

    }

    return(
        <alertasContext.Provider
            value ={{
                alerta : state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertasContext.Provider>
    )
}

export default AlertaState;