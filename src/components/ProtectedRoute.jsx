import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  // Not logged in at all
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Logged in but wrong role
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}