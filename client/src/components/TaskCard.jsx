
 function TaskCard({ task }) {
  return (
      <div 
            key={task._id} 
            style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              {task.date && <p>Fecha: {new Date(task.date).toLocaleDateString()}</p>}
            </div>
  )
}

export default TaskCard