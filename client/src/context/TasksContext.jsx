import { useContext, createContext, useState } from "react";
import { 
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest
 } from "../api/tasks";


const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if(!context){
        throw new Error("useTasks must be used within a TaskProvider")
    }
    return context;
}


export function TaskProvider({ children }){

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getTasks = async () => {
       try {
         setLoading(true)
         setError(null)
         const res = await getTasksRequest()
         console.log('Respuesta completa:', res);
         console.log('Datos de tareas:', res.data);
        setTasks(res.data)
       } catch (error) {
        console.error('Error al obtener tareas:', error);
        setError('Error al cargar las tareas')
       } finally {
         setLoading(false)
       }
    }

    const createTask = async (task) => {
    /*     console.log("task!"); */
        const res = await createTaskRequest(task)
        console.log(res);
    }
    const deleteTask = async (id) => {
      try {
         const res = await deleteTaskRequest(id)
         if(res.status === 204)setTasks(tasks.filter(task => task._id != id))
      } catch (error) {
        console.log(error)
      }
    
    }

    const getTask = async (id) => {
      try {
        const res = await getTaskRequest(id)
        return res.data;
      } catch (error) {
        console.log(error)
      }
    

    }
    const updateTask = async (id, task) => {
      try {
        await updateTaskRequest(id, task)
      } catch (error) {
        console.log(error)
      }
    }

    return(
        <TaskContext.Provider 
        value={{
            tasks,
            loading,
            error,
            createTask,
            getTasks ,
            deleteTask,
            getTask,
            updateTask,
        }}>
            {children}
        </TaskContext.Provider>
    )
}