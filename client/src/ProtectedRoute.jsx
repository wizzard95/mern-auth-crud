import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Cookies from "js-cookie";

function ProtectedRoute() {
   const {isAuthenticated, user, loading} = useAuth()
   const token = localStorage.getItem('token') || Cookies.get('token')
   
   console.log('🔍 ProtectedRoute - Token:', !!token, 'isAuthenticated:', isAuthenticated, 'user:', !!user, 'loading:', loading)

   // Mostrar loading mientras se verifica la autenticación
   if (loading) {
     console.log('⏳ ProtectedRoute cargando...')
     return (
       <div className="flex justify-center items-center h-screen">
         <div className="text-lg">Verificando autenticación...</div>
       </div>
     )
   }

   // Si no hay token o no está autenticado, redirigir al login
   if (!token || !isAuthenticated || !user) {
     console.log('❌ No autenticado, redirigiendo al login')
     return <Navigate to='/login' replace />
   }

   console.log('✅ Usuario autenticado, mostrando contenido')
   return <Outlet/>
}

export default ProtectedRoute