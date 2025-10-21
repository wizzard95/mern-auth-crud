import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";

function TasksPage() {

  const {getTasks, tasks, loading, error} = useTasks()
  const {isAuthenticated} = useAuth()
  console.log('Tareas en TasksPage:', tasks);

  useEffect(() => {
    if (isAuthenticated) {
      getTasks()
    }
  }, [isAuthenticated])

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-lg">Cargando tareas...</div>
    </div>
  )
  
  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-red-500 text-center">
        <p className="text-lg font-semibold">Error</p>
        <p>{error}</p>
        <button 
          onClick={() => getTasks()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reintentar
        </button>
      </div>
    </div>
  )

  if (tasks.length === 0) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-lg text-gray-500">No tienes tareas creadas aún.</p>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id}/>
      ))}
    </div>
  )
}

export default TasksPage;