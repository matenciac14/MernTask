import React,{useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertasContext';
import AuthContext from '../../context/autenticacion/authContext';



const Login = (props) => {
    //extraemos valores de alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    //context autenticacion
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, iniciarSesion} = authContext;
    //password o user  incorrect
    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos')
        }
        if(mensaje){
        mostrarAlerta(mensaje.msg, mensaje.categoria);
   
        }
        //eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    //state para iniciar sesion
    const[user, guardarUsuario] = useState({
        email :'',
        password :''
    });
    //extraer de usuario
    const { email, password } = user;


    //funcion lee formulario
    const onChange = (e) =>{
        guardarUsuario({
            ...user,
            [e.target.name] : e.target.value
        })
        
    }
    //enviar el formulario
    const onsubmit = (e) =>{
        e.preventDefault();

        //validacion
        if(email.trim()==='' || password.trim()===''){
            mostrarAlerta('Todos los Campos son Obligatorios', 'alerta-error');
        }

        //pasar al action
        iniciarSesion({email, password})
    }






    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>): null}

            <div className="contenedor-form sombre-dark">
                <h1>Iniciar sesion</h1>
                <form 
                    onSubmit={onsubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id='email'
                            name='email'
                            placeholder='Tu Email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id='password'
                            name='password'
                            placeholder='Tu Password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit"
                            className='btn btn-primario btn-block'
                            value='Iniciar sesion'
                        />
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className='enlace-cuenta'>
                    Obtener Cuenta  
                </Link>

            </div>
        </div>
    )
}

export default Login;
