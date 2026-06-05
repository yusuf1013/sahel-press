import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubscribe(e) {
    e.preventDefault()
    if (!email) return

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])

    if (error) {
      if (error.code === '23505') {
        setMessage('You are already subscribed.')
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } else {
      setMessage('Thank you for subscribing!')
      setEmail('')
    }
  }

  return (
    <footer style={{ backgroundColor: '#2C2A29' }} className="text-white px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-lg font-bold tracking-widest uppercase mb-3" style={{ color: '#C8873A' }}>
            Sahel Press
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            A London-based literary imprint publishing Sahel-rooted fiction and non-fiction.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest mb-3 text-gray-300">Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/books" className="hover:text-amber-400 transition-colors">Books</a></li>
            <li><a href="/submit" className="hover:text-amber-400 transition-colors">Submit Manuscript</a></li>
            <li><a href="/about" className="hover:text-amber-400 transition-colors">About</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest mb-3 text-gray-300">Newsletter</h4>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-3 py-2 rounded text-sm text-gray-900 bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded text-sm font-semibold transition-colors"
              style={{ backgroundColor: '#5A6E4A', color: 'white' }}
            >
              Subscribe
            </button>
            {message && <p className="text-xs text-amber-400 mt-1">{message}</p>}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-700 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Sahel Press. All rights reserved.
      </div>
    </footer>
  )
}