import React,{useContext, useEffect} from 'react';
import AuthContext from '../../context/autenticacion/authContext';


const Barra = () => {
    //funcion de usuario autenticado
  const authContext = useContext(AuthContext)
  const {user, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
      usuarioAutenticado();
      //eslint-disable-next-line
    }, [])

    return (
        <header className="app-header">
            {user ?
                <p className="nombre-usuario">Hola <span>{user.name}</span></p> : null}
           
            <nav className="nav-principal">
                <button 
                    className="btn btn-blank cerrar-sesion"
                    onClick={()=> cerrarSesion()}
                >Cerrar Sesion</button>
            </nav>
        </header>
    )
}

export default Barra
