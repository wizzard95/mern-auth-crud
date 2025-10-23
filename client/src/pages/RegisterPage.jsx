import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";



function RegisterPage(){
    const {
       register,
       handleSubmit,
       formState: {errors},
      } = useForm();
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
    const navigate = useNavigate()
     
    useEffect(() => {
      if(isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])


    const onSubmit = handleSubmit(async (values) =>{
           /* console.log(values); */
           signup(values)
          
        })

    return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {
        RegisterErrors && RegisterErrors.length > 0 && RegisterErrors.map((error, i) => (
          <div key={i} className="bg-red-500 py-2 text-white rounded mb-2">
            {error}
          </div>
        ))
      }

        <form onSubmit={onSubmit}>
            <input type="text" {...register("username", { required: true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
           placeholder="Username"
           />
           {errors.username && <p className="text-red-500">
              Username is requiered
            </p>}
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
            <button type="submit"
             className="bg-sky-500 px-4 py-1 rounded-sm">
                Register
            </button>
        </form>
         <p className="flex gap-x-2 justify-between">
          Ya tines una cuenta? <Link to="/login"
           className="bg-sky-500 px-4 py-1 rounded-sm"> Login</Link>
        </p>
    </div>
  )
}

export default RegisterPage