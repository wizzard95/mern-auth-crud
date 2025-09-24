import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
/* import { Link } from "react-router-dom"; */
import TaskCard from "../components/TaskCard";

function TasksPage() {

  const {getTasks, tasks, loading, error} = useTasks()
  console.log('Tareas en TasksPage:', tasks);

  useEffect(() => {
    getTasks()
  }, [])

  if (loading) return <div>Cargando tareas...</div>
  if (error) return <div>Error: {error}</div>

  if (tasks.length === 0 ) return <p>No tienes tareas creadas aún.</p>

  return (
  
        <div>
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id}/>
          ))}
    </div>
  )
}

export default TasksPage;