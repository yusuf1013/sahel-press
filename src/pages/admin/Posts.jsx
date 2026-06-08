import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const CATEGORIES = ['News', 'Events', 'Submissions', 'Announcements']

const emptyForm = {
  title: '',
  content: '',
  category: 'News',
  published_date: new Date().toISOString().split('T')[0],
}

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => { fetchPosts() }, [])

  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('published_date', { ascending: false })
    if (data) setPosts(data)
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (editingId) {
      const { error } = await supabase.from('posts').update(form).eq('id', editingId)
      setMessage(error ? 'Error: ' + error.message : 'Post updated.')
    } else {
      const { error } = await supabase.from('posts').insert([form])
      setMessage(error ? 'Error: ' + error.message : 'Post published.')
    }

    setForm(emptyForm)
    setEditingId(null)
    setLoading(false)
    fetchPosts()
  }

  function handleEdit(post) {
    setForm({
      title: post.title,
      content: post.content,
      category: post.category,
      published_date: post.published_date,
    })
    setEditingId(post.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this post?')) return
    await supabase.from('posts').delete().eq('id', id)
    fetchPosts()
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-10" style={{ color: '#2C2A29' }}>
          {editingId ? 'Edit Post' : 'New Post'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 mb-12 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Published Date</label>
            <input
              type="date"
              name="published_date"
              value={form.published_date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              required
              rows={10}
              placeholder="Write your post here..."
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          {message && (
            <p className="text-sm font-medium" style={{ color: message.startsWith('Error') ? 'red' : '#5A6E4A' }}>
              {message}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded font-semibold text-sm text-white disabled:opacity-50"
              style={{ backgroundColor: '#5A6E4A' }}
            >
              {loading ? 'Saving...' : editingId ? 'Update Post' : 'Publish Post'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => { setForm(emptyForm); setEditingId(null) }}
                className="px-6 py-3 rounded font-semibold text-sm border border-gray-300 text-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2 className="text-xl font-bold mb-6" style={{ color: '#2C2A29' }}>All Posts</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold" style={{ color: '#2C2A29' }}>{post.title}</p>
                <p className="text-sm text-gray-500">{post.category} · {new Date(post.published_date).toLocaleDateString('en-GB')}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-sm font-semibold underline underline-offset-4"
                  style={{ color: '#5A6E4A' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-sm font-semibold text-red-400 underline underline-offset-4"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}