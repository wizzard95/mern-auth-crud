import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


function ProtectedRoute() {
   const {isAuthenticated, user, loading} = useAuth()
   const [isLoading, setIsLoading] = useState(true)
   
   useEffect(() => {
     const token = Cookies.get('token')
     console.log('🔍 ProtectedRoute - Token:', !!token, 'isAuthenticated:', isAuthenticated, 'user:', !!user, 'loading:', loading)
     
     // Si no hay token, no esperar
     if (!token) {
       console.log('❌ No hay token, no esperando')
       setIsLoading(false)
       return
     }
     
     // Si hay token pero aún está cargando la verificación, esperar
     if (loading) {
       console.log('⏳ Esperando verificación del token...')
       return
     }
     
     // Si ya terminó de cargar, actualizar el estado
     console.log('✅ Verificación completada')
     setIsLoading(false)
   }, [isAuthenticated, user, loading])

   // Mostrar loading mientras se verifica la autenticación
   if (isLoading || loading) {
     console.log('⏳ ProtectedRoute cargando...')
     return <h1>Cargando...</h1>
   }

   if (!isAuthenticated || !user) {
     console.log('❌ No autenticado, redirigiendo al login')
     return <Navigate to='/login' replace />
   }

   console.log('✅ Usuario autenticado, mostrando contenido')
   return <Outlet/>
}

export default ProtectedRoute