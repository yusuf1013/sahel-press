import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [stats, setStats] = useState({
    books: 0,
    submissions: 0,
    pending: 0,
    subscribers: 0,
    posts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const [books, submissions, pending, subscribers, posts] = await Promise.all([
        supabase.from('books').select('id', { count: 'exact', head: true }),
        supabase.from('submissions').select('id', { count: 'exact', head: true }),
        supabase.from('submissions').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true }),
        supabase.from('posts').select('id', { count: 'exact', head: true }),
      ])

      setStats({
        books: books.count || 0,
        submissions: submissions.count || 0,
        pending: pending.count || 0,
        subscribers: subscribers.count || 0,
        posts: posts.count || 0,
      })
      setLoading(false)
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Total Books', value: stats.books, link: '/admin/books', action: 'Manage Books' },
    { label: 'Total Submissions', value: stats.submissions, link: '/admin/submissions', action: 'View Submissions' },
    { label: 'Pending Review', value: stats.pending, link: '/admin/submissions', action: 'Review Now' },
    { label: 'Newsletter Subscribers', value: stats.subscribers, link: '/admin/newsletter', action: 'View Subscribers' },
    { label: 'Total Posts', value: stats.posts, link: '/admin/posts', action: 'Manage Posts' },
  ]

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2C2A29' }}>Dashboard</h1>
        <p className="text-gray-500 mb-10">Welcome back, Issoufou.</p>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
            {cards.map(card => (
              <div key={card.label} className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-sm text-gray-500 mb-1">{card.label}</p>
                <p className="text-4xl font-bold mb-4" style={{ color: '#2C2A29' }}>{card.value}</p>
                <Link
                  to={card.link}
                  className="text-xs font-semibold underline underline-offset-4"
                  style={{ color: '#5A6E4A' }}
                >
                  {card.action}
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-4 gap-4">
          <Link to="/admin/books" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-1" style={{ color: '#2C2A29' }}>Manage Books</h3>
            <p className="text-sm text-gray-500">Add, edit or remove books.</p>
          </Link>
          <Link to="/admin/submissions" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-1" style={{ color: '#2C2A29' }}>Review Submissions</h3>
            <p className="text-sm text-gray-500">Read manuscripts and update status.</p>
          </Link>
          <Link to="/admin/newsletter" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-1" style={{ color: '#2C2A29' }}>Newsletter</h3>
            <p className="text-sm text-gray-500">View and export subscribers.</p>
          </Link>
          <Link to="/admin/posts" className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-1" style={{ color: '#2C2A29' }}>News & Posts</h3>
            <p className="text-sm text-gray-500">Write and publish news updates.</p>
          </Link>
        </div>
      </div>
    </div>
  )
}