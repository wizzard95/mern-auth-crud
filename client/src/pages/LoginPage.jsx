import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";



function LoginPage(){
const {
  register,
  handleSubmit,
  formState: {errors},
  } = useForm();
  
  const {signin, errors: signinErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

const onSubmit = handleSubmit((data) => {
/*   console.log(data); */
    signin(data)
})
  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
        signinErrors.map((error, i) => (
          <div key={i} className="bg-red-500 py-2 text-white text-center rounded mb-2">
            {error}
          </div>
        ))
      }

      <h1 className="text-2xl font-bold">Login</h1>


        <form onSubmit={onSubmit}>
         
            <input type="email" {...register("email", { required: true})} 
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">
              Email is requiered
            </p>}
            <input type="password" {...register("password", { required: true})}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
            />
            {errors.password && <p className="text-red-500">
              Password is requiered
            </p>}
            <button type="submit">
                Iniciar Sesion
            </button>
        </form>
        <p className="flex gap-x-2 justify-between">
          No tienes una cuenta? <Link to="/register"
          className="text-sky-500"> Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage