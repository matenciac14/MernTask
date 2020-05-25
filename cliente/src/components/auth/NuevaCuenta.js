import React,{useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertasContext';
import AuthContext from '../../context/autenticacion/authContext';




const NuevaCuenta  = (props) => {
    //extraemos valores de alertas
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    //context autenticacion
    const authContext = useContext(AuthContext);
    const {mensaje, autenticado,registrarUsuario} = authContext;

    //registro duplicado
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
    const[usuario, guardarUsuario] = useState({
        name:"",
        email :'',
        password :'',
        confirmar:''
    });
    //extraer de usuario
    const {name, email, password, confirmar } = usuario;


    //funcion lee formulario
    const onChange = (e) =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
        
    }
    //enviar el formulario
    const onsubmit = (e) =>{
        e.preventDefault();

        //validacion
        if(name.trim()===''|| email.trim()==='' || password.trim()==='' || confirmar.trim()===''){
            mostrarAlerta('Todos los Campos son Obligatorios', 'alerta-error');
            return;
        }

        //minimo 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El campo debe tener minimo 6 caracteres', 'alerta-error');
            return;

        }

        //los campos sean iguales
        if(password !== confirmar){
            mostrarAlerta('las contraseñas no son iguales', 'alerta-error');
            return;
        }

        //pasar al action
        registrarUsuario({
            name,
            email,
            password
        })


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
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text"
                            id='nombre'
                            name='name'
                            placeholder='Tu nombre'
                            value={name}
                            onChange={onChange}
                        />
                    </div>
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
                        <label htmlFor="password">Confirmar Password</label>
                        <input 
                            type="password"
                            id='confirmar'
                            name='confirmar'
                            placeholder='Confirma Password'
                            value={confirmar}
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

                <Link to={'/'} className='enlace-cuenta'>
                    Volver a Iniciar Sesion 
                </Link>

            </div>
        </div>
    )
}

export default NuevaCuenta ;
