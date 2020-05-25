import React,{ Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
  //obtener el state del frmulario
  const proyectosContext = useContext(proyectoContext);
  const {formulario,errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

  //state
  const [ project, guardarProyecto ] = useState({
    name:''

  });
  //extrae nombre
  const {name} = project;

  //contenido del input
  const onChangeProyecto =(e)=>{
    guardarProyecto({
      ...project,
      [e.target.name] : e.target.value
    })
  }
  
//cuanto el usuario envia proyecto
const onSubmitProyecto = (e)=>{
  e.preventDefault();
//validar
if(name === ''){
  mostrarError(true);
  return;
} 

//agregar al state
agregarProyecto(project)
//reiniciar
guardarProyecto({
  name: ''
})

}

const onClickFormulario =()=>{
  mostrarFormulario();
}

    return (
      <Fragment>
        <button className="btn btn-block btn-primario" type="button" onClick={onClickFormulario}>
          Nuevo Proyecto
        </button>
        {formulario ?
        (
          <form className='formulario-nuevo-proyecto' onSubmit={onSubmitProyecto}>
            <input type="text" className='input-text' placeholder='Nombre Proyecto' name='name' onChange={onChangeProyecto} value={name}/>
            <input type="submit" className='btn btn-primario btn-block' value='Agregar Proyecto'/>
          </form>

        ) : null}
        
        {errorformulario ? <p className="mensaje error" >El nombre es Obligatorio</p> : null}
      </Fragment>
    );
}

export default NuevoProyecto;
