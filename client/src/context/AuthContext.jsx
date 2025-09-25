import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";



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
    const [loading, setLoading] = useState(false)
    
    // Verificar autenticación al cargar
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token') || Cookies.get('token')
            console.log('🔍 Verificando autenticación inicial, token:', !!token)
            
            if (token) {
                setLoading(true)
                try {
                    const res = await verifyTokenRequest()
                    console.log('✅ Token válido en carga inicial:', res.data)
                    if (res.data) {
                        setUser(res.data)
                        setIsAuthenticated(true)
                    }
                } catch (error) {
                    console.log('❌ Error verificando token en carga inicial:', error)
                    setUser(null)
                    setIsAuthenticated(false)
                } finally {
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }
        
        checkAuth()
    }, [])

    const signup = async (user) =>{
         try {
           setErrors([]) // Limpiar errores anteriores
           const res = await registerRequest(user)
           console.log('✅ Registro exitoso:', res.data);
           
           // Guardar token en localStorage
           if (res.data.token) {
               localStorage.setItem('token', res.data.token);
               console.log('💾 Token guardado en localStorage');
           }
           
           setUser(res.data)
           setIsAuthenticated(true)
           setLoading(false)
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
            setLoading(false)
         }
    }

const signin = async (user) => {
    try {
        setErrors([]) // Limpiar errores anteriores
        console.log('🔍 Enviando login a:', 'http://localhost:3003/api/login')
        console.log('📤 Datos enviados:', user)
        const res = await loginRequest(user)
        console.log('✅ Respuesta completa:', res)
        console.log('📋 Datos del usuario:', res.data)
        
        // Guardar token en localStorage
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            console.log('💾 Token guardado en localStorage');
        }
        
        setUser(res.data)
        setIsAuthenticated(true)
        setLoading(false)
    } catch (error) {
        console.log('❌ Error en login:', error)
        const data = error?.response?.data
        if (Array.isArray(data)) {
            setErrors(data)
        } else if (data?.message) {
            setErrors([data.message])
        } else if (data?.error && Array.isArray(data.error)) {
            setErrors(data.error)
        } else if (data) {
            setErrors([JSON.stringify(data)])
        } else {
            setErrors(["Error al iniciar sesión"])
        }
        setLoading(false)
    }
   
}

const logout = async () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
}



useEffect(() => {
    if (errors.length > 0) {
        const timer = setTimeout(() => {
            setErrors([])
        }, 5000);
        return () => clearTimeout(timer)
    }
}, [errors])


    return(
        <AuthContext.Provider value={{
            signup,
            signin,
            logout,
            loading,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}