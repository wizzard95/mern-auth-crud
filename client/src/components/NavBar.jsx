import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function NavBar(){

  const { isAuthenticated, logout, user } = useAuth();

 /*  console.log(user) */
  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to='/'>
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
        <ul className="flex gap-x-2"> 
           {isAuthenticated ? (
            <>
             <li>
                WELCOME {user.username}
            </li>
               <li>
                <Link to='/add-task'>Add Task</Link>
            </li>
            <li>
                <Link to='/' onClick={() => {
                  logout();
                }}>Logout</Link>
            </li>
            </>
           ) : ( 
            <>
             <li>
                <Link to='/login'>Login</Link>
            </li>
               <li>
                <Link to='/register'>Register</Link>
            </li>
            </>
           )}
        </ul>
    </nav>
  )
}

export default NavBar