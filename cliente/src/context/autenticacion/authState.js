import React,{useReducer} from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

//types
import{
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {
    const initialState ={
        token: localStorage.getItem('token'),
        autenticado:null,
        user: null,
        mensaje:null,
        cargando: true
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //funciones
    const registrarUsuario = async datos =>{
        try {
            const respuesta = await  clienteAxios.post('/api/users', datos);
            console.log(respuesta.data);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })
            usuarioAutenticado();
            
        } catch (error) {
            const alerta ={
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }


    const usuarioAutenticado = async ()=>{
        const token = localStorage.getItem('token');
        if(token){
            //send token to header
            tokenAuth(token);
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta.data.user)
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.user
            })
        } catch (error) {
            //console.log(error.response)
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //login
    const iniciarSesion = async (datos) =>{
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            //console.log(respuesta)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            })
            usuarioAutenticado();
            
        } catch (error) {
            //console.log(error.response.data.msg)
            const alerta ={
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    //cerrar sesion 
    const cerrarSesion = ()=>{
         dispatch({
             type:CERRAR_SESION
         })
    }

    return(
        <AuthContext.Provider
            value={{
            token : state.token,
            autenticado:state.autenticado,
            user: state.user,
            mensaje:state.mensaje,
            cargando: state.cargando,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;