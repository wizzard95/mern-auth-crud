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
     return <h1>Cargando...</h1>
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