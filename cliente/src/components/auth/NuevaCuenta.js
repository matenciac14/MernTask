import React,{useState} from 'react';
import {Link} from 'react-router-dom';




const NuevaCuenta  = () => {
    //state para iniciar sesion
    const[usuario, guardarUsuario] = useState({
        nombre:"",
        email :'',
        password :'',
        confirmar:''
    });
    //extraer de usuario
    const {nombre, email, password, confirmar } = usuario;


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

        //minimo 6 caracteres

        //los campos sean iguales

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
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text"
                            id='nombre'
                            name='nombre'
                            placeholder='Tu nombre'
                            value={nombre}
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
