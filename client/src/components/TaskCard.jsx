import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";


 function TaskCard({ task }) {

  const {deleteTask} = useTasks()

  return (
      <div 
            /* key={task._id}  */
             className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
               <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.title}</h1>
              <div className="flex gap-x-2 items-center">
                <button onClick={() => {
                  deleteTask(task._id)
                }}>delete</button>
                <button>
                  <Link to={`/tasks/${task._id}`}>edit</Link>
                </button>
              </div>
               </header>
              <p className="text-slate-300">{task.description}</p>
            <p className="text-slate-300"> {task.date && <p>Fecha: {new Date(task.date).toLocaleDateString()}</p>}</p>
            </div>
  )
}

export default TaskCard