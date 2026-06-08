import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['All', 'News', 'Events', 'Submissions', 'Announcements']

export default function News() {
  const [posts, setPosts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [category, setCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .order('published_date', { ascending: false })
      if (data) {
        setPosts(data)
        setFiltered(data)
      }
      setLoading(false)
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    if (category === 'All') {
      setFiltered(posts)
    } else {
      setFiltered(posts.filter(p => p.category === category))
    }
  }, [category, posts])

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#5A6E4A' }}>Latest</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2C2A29' }}>News & Updates</h1>
        <p className="text-gray-500 mb-10">Announcements, events, and updates from Sahel Press.</p>

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={
                category === cat
                  ? { backgroundColor: '#5A6E4A', color: 'white' }
                  : { backgroundColor: '#F0EBE3', color: '#2C2A29' }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">No posts yet.</p>
        ) : (
          <div className="space-y-8">
            {filtered.map(post => (
              <Link key={post.id} to={`/news/${post.id}`}>
                <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ backgroundColor: '#F0EBE3', color: '#5A6E4A' }}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(post.published_date).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mb-2" style={{ color: '#2C2A29' }}>{post.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{post.content}</p>
                  <p className="text-sm font-semibold mt-3 underline underline-offset-4" style={{ color: '#5A6E4A' }}>
                    Read more
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}