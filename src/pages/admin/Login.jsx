import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password.')
    } else {
      navigate('/admin/dashboard')
    }

    setLoading(false)
  }

  return (
    <div
      style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}
      className="flex items-center justify-center px-6"
    >
      <div className="bg-white rounded-lg shadow-sm p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#2C2A29' }}>Admin Login</h1>
        <p className="text-sm text-gray-500 mb-8">Sahel Press dashboard access</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded font-semibold text-sm text-white transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: '#5A6E4A' }}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  )
}