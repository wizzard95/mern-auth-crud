import { Link } from "react-router-dom";


 
function HomePage(){
  return (
   
    <div>
      <h1>home</h1>
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
    </div>

    
    
  )
}

export default HomePage