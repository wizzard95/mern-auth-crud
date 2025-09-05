import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([])

    const signup = async (user) =>{
         try {
           setErrors([]) // Limpiar errores anteriores
           const res = await registerRequest(user)
           console.log(res.data);
           setUser(res.data)
           setIsAuthenticated(true)
         } catch (error) {
            console.log('Error completo:', error);
            console.log('Error response:', error.response);
            
            // El backend puede devolver un array o un objeto con message
            if (Array.isArray(error.response?.data)) {
               setErrors(error.response.data)
            } else if (error.response?.data?.message) {
               setErrors([error.response.data.message])
            } else if (error.response?.data?.error && Array.isArray(error.response.data.error)) {
               setErrors(error.response.data.error)
            } else if (error.response?.data) {
               // Si hay data pero no es array ni tiene message, intentar extraer errores
               setErrors([JSON.stringify(error.response.data)])
            } else {
               setErrors(['Error al registrar usuario'])
            }
         }
    }

    return(
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}