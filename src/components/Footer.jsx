import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return
    const { error } = await supabase.from("newsletter_subscribers").insert([{ email }])
    if (error) {
      if (error.code === "23505") { setMessage("You are already subscribed.") } else { setMessage("Something went wrong.") }
    } else {
      setMessage("Thank you for subscribing!")
      setEmail("")
    }
  }

  return (
    <footer style={{ backgroundColor: "#2C2A29" }} className="text-white px-6 py-16 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-lg font-bold tracking-widest uppercase mb-3" style={{ color: "#C8873A" }}>Sahel Press</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">An independent literary imprint publishing African voices. Based in London.</p>
          <a href="https://ko-fi.com/sahelpress" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: "#C8873A", color: "white" }}>Support Us on Ko-fi</a>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest mb-4 text-gray-300">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/books" className="hover:text-amber-400 transition-colors">Books</Link></li>
            <li><Link to="/news" className="hover:text-amber-400 transition-colors">News</Link></li>
            <li><Link to="/about" className="hover:text-amber-400 transition-colors">About</Link></li>
            <li><Link to="/submit" className="hover:text-amber-400 transition-colors">Submit Manuscript</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest mb-4 text-gray-300">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="mailto:issoufou@sahelpress.co.uk" className="hover:text-amber-400 transition-colors">issoufou@sahelpress.co.uk</a></li>
            <li>London, United Kingdom</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest mb-4 text-gray-300">Newsletter</h4>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="px-3 py-2 rounded text-sm text-gray-900 bg-white focus:outline-none" />
            <button type="submit" className="px-4 py-2 rounded text-sm font-semibold" style={{ backgroundColor: "#5A6E4A", color: "white" }}>Subscribe</button>
            {message && <p className="text-xs text-amber-400 mt-1">{message}</p>}
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>copyright {new Date().getFullYear()} Sahel Press. All rights reserved.</p>
        <p>Founded by Issoufou Boureima</p>
      </div>
    </footer>
  )
}