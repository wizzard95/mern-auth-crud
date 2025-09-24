import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";


function TasksPage() {

  const {getTasks, tasks, loading, error} = useTasks()
  console.log('Tareas en TasksPage:', tasks);

  useEffect(() => {
    getTasks()
  }, [])

  if (loading) return <div>Cargando tareas...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h2>Mis Tareas</h2>
         {/*  <Link 
            to="/tasks/new" 
            style={{
              backgroundColor: '#3b82f6', 
              color: 'white', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              textDecoration: 'none'
            }}
          >
            + Nueva Tarea
          </Link> */}
        </div>
        {tasks.length === 0 ? (
          <p>No tienes tareas creadas aún.</p>
        ) : (
          tasks.map(task => (
            <div key={task._id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              {task.date && <p>Fecha: {new Date(task.date).toLocaleDateString()}</p>}
            </div>
          ))
        )}
    </div>
  )
}

export default TasksPage