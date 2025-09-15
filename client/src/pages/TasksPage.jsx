import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";


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
        <h2>Mis Tareas</h2>
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