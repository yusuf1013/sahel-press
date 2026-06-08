import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Header({ user }) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate("/")
  }

  return (
    <header style={{ backgroundColor: "#2C2A29" }} className="text-white px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-widest uppercase" style={{ color: "#C8873A" }}>Sahel Press</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm tracking-wide">
          <Link to="/books" className="hover:text-amber-400 transition-colors">Books</Link>
          <Link to="/news" className="hover:text-amber-400 transition-colors">News</Link>
          <Link to="/submit" className="hover:text-amber-400 transition-colors">Submit</Link>
          <Link to="/about" className="hover:text-amber-400 transition-colors">About</Link>
          {user && (<><Link to="/admin/dashboard" className="hover:text-amber-400 transition-colors">Dashboard</Link><button onClick={handleLogout} className="hover:text-amber-400 transition-colors">Logout</button></>)}
          <a href="https://ko-fi.com/sahelpress" target="_blank" rel="noopener noreferrer" className="px-4 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: "#C8873A", color: "white" }}>Support Us</a>
        </nav>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4 flex flex-col gap-4 text-sm px-6">
          <Link to="/books" onClick={() => setMenuOpen(false)} className="hover:text-amber-400 transition-colors">Books</Link>
          <Link to="/news" onClick={() => setMenuOpen(false)} className="hover:text-amber-400 transition-colors">News</Link>
          <Link to="/submit" onClick={() => setMenuOpen(false)} className="hover:text-amber-400 transition-colors">Submit</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-amber-400 transition-colors">About</Link>
          {user && (<><Link to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-amber-400 transition-colors">Dashboard</Link><button onClick={handleLogout} className="hover:text-amber-400 transition-colors">Logout</button></>)}
          <a href="https://ko-fi.com/sahelpress" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full text-sm font-semibold text-center" style={{ backgroundColor: "#C8873A", color: "white" }}>Support Us</a>
        </div>
      )}
    </header>
  )
}