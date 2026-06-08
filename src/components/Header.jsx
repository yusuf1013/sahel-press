import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Header({ user }) {
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header style={{ backgroundColor: '#2C2A29' }} className="text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-widest uppercase" style={{ color: '#C8873A' }}>
          Sahel Press
        </Link>
        <nav className="flex gap-6 text-sm tracking-wide">
          <Link to="/about" className="hover:text-amber-400 transition-colors">About</Link>
          <Link to="/news" className="hover:text-amber-400 transition-colors">News</Link>
          
            href="https://ko-fi.com/sahelpress"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
            style={{ backgroundColor: '#C8873A', color: 'white' }}
          >
            Support Us
          </a>
          <Link to="/submit" className="hover:text-amber-400 transition-colors">Submit</Link>
          <Link to="/about" className="hover:text-amber-400 transition-colors">About</Link>
         {user && (
            <>
              <Link to="/admin/dashboard" className="hover:text-amber-400 transition-colors">Dashboard</Link>
              <button onClick={handleLogout} className="hover:text-amber-400 transition-colors">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}