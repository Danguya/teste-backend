import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const PrivateRoute = () => {
  const { token } = useAuth()
  const isAuthenticated = token

  if (isAuthenticated) {
    return <Outlet />
  } else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute
