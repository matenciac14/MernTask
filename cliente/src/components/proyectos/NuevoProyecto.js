import React,{ Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
  //obtener el state del frmulario
  const proyectosContext = useContext(proyectoContext);
  const {formulario,mostrarFormulario, agregarProyecto } = proyectosContext;

  //state
  const [ proyecto, guardarProyecto ] = useState({
    nombre:''

  });
  //extrae nombre
  const {nombre} = proyecto;

  //contenido del input
  const onChangeProyecto =(e)=>{
    guardarProyecto({
      ...proyecto,
      [e.target.name] : e.target.value
    })
  }
  
//cuanto el usuario envia proyecto
const onSubmitProyecto = (e)=>{
  e.preventDefault();
//validar
if(nombre === '') return;

//agregar al state
agregarProyecto(proyecto)
//reiniciar
guardarProyecto({
  nombre: ''
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
            <input type="text" className='input-text' placeholder='Nombre Proyecto' name='nombre' onChange={onChangeProyecto} value={nombre}/>
            <input type="submit" className='btn btn-primario btn-block' value='Agregar Proyecto'/>
          </form>

        ) : null}
        
      </Fragment>
    );
}

export default NuevoProyecto;
