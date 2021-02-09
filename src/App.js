
import React, { useState } from 'react'
import {isEmpty} from 'lodash'
import shortid from 'shortid'


function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const addTask=(e)=>{
  e.preventDefault()
  if(isEmpty(task)){
   console.log("task emty")
   return;
  }
  const newTask={
    id:shortid.generate(),
     name: task
  }

  setTasks([...tasks, newTask])
  setTask("");
}

  return (
    <div className="container mt-5">   
        
          <h1>Task</h1>
          <hr/>
          <div className="row">
            <div className="col-8">  
              <h4 className="text-center">Lista de tareas</h4>            
              <ul className="list-group">
              {
                tasks.map((task) => (
                  <li className="list-group-item" key={task.id}>
                    <span className="lead">{task.name}</span>
                    <button className="btn btn-danger btn-sm float-right mx-2">Eliminar</button>
                    <button className="btn btn-warning btn-sm float-right mx-2">Editar</button>
                  </li>
                ))
              }

              </ul>
            </div>

            
            <div className="col-4">
              <h4 className="text-center">Formmulario</h4>  
              <form onSubmit={addTask}>
                <input type="text"
                       placeholder="ingresa la tarea" 
                       className="form-control mb-2"
                       onChange = {(text)=> setTask(text.target.value)}
                       value={task}>

                </input>
                <button className="btn btn-dark btn-block" type="submit"> Agregar</button>
              </form>            
            </div>
          </div>              
    </div>
  );
}

export default App;
