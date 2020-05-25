import React,{useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from '../../context/alertas/alertasContext';
import {CSSTransition, TransitionGroup}from 'react-transition-group';

const ListadoProyectos = () => {
   
    const proyectosContext = useContext(proyectoContext);
    const {mensaje, projects, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta } = alertaContext;
   
    useEffect(() => {
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos();
        
    }, [mensaje])

    
    if (projects.length === 0) return <p>No hay Proyectos, Crea el Primero !</p>;

    return (
        <ul className="listado-proyectos">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <TransitionGroup>
                {projects.map(project =>(
                    <CSSTransition
                        key={project._id}
                        timeout={300}
                        classNames="proyecto"
                    >
                        <Proyecto                       
                            project ={project}
                        />
                    </CSSTransition>
                
            ))}
            </TransitionGroup>
            
        </ul>
    )
}

export default ListadoProyectos
