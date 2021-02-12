
import React, { useState, useEffect  } from 'react'
import {isEmpty, size} from 'lodash'

import { addDocument, deleteDocument, getCollection, uppdateDocument } from './actions'


function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, seteditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    (async()=>{
      const result =await getCollection("tasks")
      if (result.statusResponse) {
        setTasks(result.data)
      }      
    })()
    
  }, [])


  const validForm =()=>{
    let isValid =true;
    setError(null);
    
    if(isEmpty(task)){      
      setError("Debes ingresar una tarea")
       isValid =false;
      }

      return isValid;
  }

  const addTask= async (e)=>{
    e.preventDefault()
    if(!validForm()){    
      return;
    }
    const result = await addDocument("tasks", {name: task})
    if (!result.statusResponse) {
      setError(result.error)
      return
    } 

    setTasks([...tasks, {id: result.data.id, name:task}])
    setTask("");
  }


  const deleteTask =async (id) =>{
    const result = await deleteDocument("tasks",id)
    if (!result.statusResponse) {
      setError(result.error)
      return
    }
    
    const  filsterTask = tasks.filter(task => task.id !== id)
    setTasks(filsterTask)
  }


const editTask =(theTask) =>{
  setTask(theTask.name);
  seteditMode(true);
  setId(theTask.id);
}

const saveTask= async (e)=>{
  e.preventDefault()

  if(!validForm()){    
    return;
  }

  const result = await uppdateDocument("tasks", id, {name: task})
  if (!result.statusResponse) {
     setError(result.error)
     return
  }

  const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
  setTasks(editedTasks); 

  seteditMode(false)
  setTask("");
  setId("");

}



  return (
    <div className="container mt-5">   
        
          <h1>Task</h1>
          <hr/>
          <div className="row">
            <div className="col-8">  
              <h4 className="text-center">Lista de tareas</h4>            
             { 
              size(tasks) === 0  ?(<h5 className="list-group-item"> Aun no hay tareas programadas</h5>
                ):(

                  <ul className="list-group">
                    {
                      tasks.map((task) => (
                        <li className="list-group-item" key={task.id}>
                          <span className="lead">{task.name}</span>
                          <button className="btn btn-danger btn-sm float-right mx-2"
                                  onClick = {()=> deleteTask(task.id)}>
                            Eliminar</button>
                          <button className="btn btn-warning btn-sm float-right mx-2"
                                  onClick={()=> editTask(task)}>
                            Editar</button>
                        </li>
                      ))
                    }
                  </ul>
                )                
              }
            </div>

            
            <div className="col-4">
              <h4 className="text-center">
                {editMode ? "Modidificar Tare":"Agregar tarea"}
                </h4>  
              <form onSubmit={editMode ? saveTask: addTask}>
               {
                  error && <span className="text-danger">{error}</span>
                } 
                <input type="text"
                       placeholder="ingresa la tarea" 
                       className="form-control mb-2"
                       onChange = {(text)=> setTask(text.target.value)}
                       value={task}>
                </input>
                
                <button className={editMode ? "btn btn-warning btn-block" :"btn btn-dark btn-block"} type="submit"> 
                 {editMode ? "Guardar":"Agregar"}</button>
              </form>            
            </div>
          </div>              
    </div>
  );
}

export default App;
