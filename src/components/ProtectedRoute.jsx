import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div
        style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}
        className="flex items-center justify-center"
      >
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}