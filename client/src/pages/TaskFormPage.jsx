import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { Link, useNavigate, useParams} from "react-router-dom";
import { useEffect } from "react";


function TaskFormPage() {

  const {register, handleSubmit, setValue} = useForm()
  const {createTask, getTask, updateTask} = useTasks();
  const navigate = useNavigate();
  const params = useParams()

  useEffect(() => {
    async function loadTask(){
    if(params.id){
      const task = await getTask(params.id);
      setValue('title', task.title)
      setValue('description', task.description)
    }}
    loadTask()
  }, [])

  const onSubmit = handleSubmit((data) => {
    if(params.id){
      updateTask(params.id, data)
    }else{
      createTask(data)
    }
 
  navigate('/tasks')
  })

  return (
    <div>
      <div style={{marginBottom: '20px'}}>
        <Link 
          to="/tasks" 
          style={{
            color: '#3b82f6', 
            textDecoration: 'none',
            fontSize: '14px'
          }}
        >
          ← Volver a Tareas
        </Link>
        <h2 style={{margin: '10px 0'}}>Nueva Tarea</h2>
      </div>
      
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Title" 
            {...register('title')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          <textarea rows="3" placeholder="Description"
            {...register('description')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          <button 
            type="submit"
            style={{
              backgroundColor: '#10b981',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Guardar Tarea
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskFormPage