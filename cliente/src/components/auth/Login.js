import React,{useState} from 'react';
import {Link} from 'react-router-dom';




const Login = () => {
    //state para iniciar sesion
    const[usuario, guardarUsuario] = useState({
        email :'',
        password :''
    });
    //extraer de usuario
    const { email, password } = usuario;


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

        //pasar al action

    }






    return (
        <div className="form-usuario">
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
