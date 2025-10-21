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
        setTasks(res.data || [])
       } catch (error) {
        console.error('Error al obtener tareas:', error);
        if (error.response?.status === 401) {
            setError('Sesión expirada. Por favor, inicia sesión nuevamente.')
        } else if (error.response?.status === 403) {
            setError('No tienes permisos para acceder a las tareas.')
        } else {
            setError('Error al cargar las tareas. Verifica tu conexión.')
        }
        setTasks([])
       } finally {
         setLoading(false)
       }
    }

    const createTask = async (task) => {
        try {
            setLoading(true)
            setError(null)
            const res = await createTaskRequest(task)
            console.log('Tarea creada:', res.data);
            
            // Actualizar la lista de tareas agregando la nueva tarea
            setTasks(prevTasks => [...prevTasks, res.data])
        } catch (error) {
            console.error('Error al crear tarea:', error);
            setError('Error al crear la tarea')
        } finally {
            setLoading(false)
        }
    }
    const deleteTask = async (id) => {
      try {
         setLoading(true)
         setError(null)
         const res = await deleteTaskRequest(id)
         if(res.status === 204) {
           setTasks(prevTasks => prevTasks.filter(task => task._id !== id))
         }
      } catch (error) {
        console.error('Error al eliminar tarea:', error);
        setError('Error al eliminar la tarea')
      } finally {
        setLoading(false)
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
        setLoading(true)
        setError(null)
        const res = await updateTaskRequest(id, task)
        console.log('Tarea actualizada:', res.data);
        
        // Actualizar la lista de tareas
        setTasks(prevTasks => 
          prevTasks.map(t => t._id === id ? res.data : t)
        )
      } catch (error) {
        console.error('Error al actualizar tarea:', error);
        setError('Error al actualizar la tarea')
      } finally {
        setLoading(false)
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