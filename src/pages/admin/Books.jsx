import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const GENRES = ['Literary Fiction', 'Memoir', 'Drama', 'Poetry', 'Other']

const emptyForm = {
  title: '',
  author: '',
  author_bio: '',
  genre: '',
  synopsis: '',
  cover_image_url: '',
  purchase_links: [],
  featured: false,
  published_date: '',
}

export default function AdminBooks() {
  const [books, setBooks] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [coverFile, setCoverFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [platformInput, setPlatformInput] = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [links, setLinks] = useState([])

  useEffect(() => { fetchBooks() }, [])

  async function fetchBooks() {
    const { data } = await supabase.from('books').select('*').order('created_at', { ascending: false })
    if (data) setBooks(data)
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  function addLink() {
    if (!platformInput.trim() || !urlInput.trim()) return
    const newLinks = [...links, { platform: platformInput.trim(), url: urlInput.trim() }]
    setLinks(newLinks)
    setForm({ ...form, purchase_links: newLinks })
    setPlatformInput('')
    setUrlInput('')
  }

  function removeLink(i) {
    const newLinks = links.filter((_, idx) => idx !== i)
    setLinks(newLinks)
    setForm({ ...form, purchase_links: newLinks })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    let cover_image_url = form.cover_image_url

    if (coverFile) {
      const fileName = `${Date.now()}_${coverFile.name}`
      const { error: uploadError } = await supabase.storage
        .from('book-covers')
        .upload(fileName, coverFile)

      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('book-covers').getPublicUrl(fileName)
        cover_image_url = urlData.publicUrl
      }
    }

    const payload = {
      title: form.title,
      author: form.author,
      author_bio: form.author_bio,
      genre: form.genre,
      synopsis: form.synopsis,
      cover_image_url: cover_image_url,
      purchase_links: links,
      featured: form.featured,
      published_date: form.published_date || null,
    }

    if (editingId) {
      const { error } = await supabase.from('books').update(payload).eq('id', editingId)
      if (error) {
        setMessage('Error: ' + error.message)
      } else {
        setMessage('Book updated successfully.')
      }
    } else {
      const { error } = await supabase.from('books').insert([payload])
      if (error) {
        setMessage('Error: ' + error.message)
      } else {
        setMessage('Book added successfully.')
      }
    }

    setForm(emptyForm)
    setLinks([])
    setEditingId(null)
    setCoverFile(null)
    setLoading(false)
    fetchBooks()
  }

  function handleEdit(book) {
    setForm({
      title: book.title,
      author: book.author,
      author_bio: book.author_bio || '',
      genre: book.genre,
      synopsis: book.synopsis,
      cover_image_url: book.cover_image_url || '',
      purchase_links: book.purchase_links || [],
      featured: book.featured || false,
      published_date: book.published_date || '',
    })
    setLinks(book.purchase_links || [])
    setEditingId(book.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this book?')) return
    await supabase.from('books').delete().eq('id', id)
    fetchBooks()
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-10" style={{ color: '#2C2A29' }}>
          {editingId ? 'Edit Book' : 'Add New Book'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 mb-12 space-y-5">

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Author</label>
            <input type="text" name="author" value={form.author} onChange={handleChange} required
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Genre</label>
            <select name="genre" value={form.genre} onChange={handleChange} required
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700">
              <option value="">Select genre</option>
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Synopsis</label>
            <textarea name="synopsis" value={form.synopsis} onChange={handleChange} required rows={4}
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Author Bio</label>
            <textarea name="author_bio" value={form.author_bio} onChange={handleChange} rows={3}
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Published Date</label>
            <input type="date" name="published_date" value={form.published_date} onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-700" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Cover Image</label>
            <input type="file" accept="image/*" onChange={e => setCoverFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700" />
            {form.cover_image_url && (
              <p className="text-xs text-gray-400 mt-1">Current cover saved</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#2C2A29' }}>Purchase Links</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Platform (e.g. Amazon)"
                value={platformInput}
                onChange={e => setPlatformInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded border border-gray-200 text-sm focus:outline-none"
              />
              <input
                type="text"
                placeholder="Full URL"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded border border-gray-200 text-sm focus:outline-none"
              />
              <button
                type="button"
                onClick={addLink}
                className="px-4 py-2 rounded text-sm font-semibold text-white"
                style={{ backgroundColor: '#5A6E4A' }}
              >
                Add
              </button>
            </div>
            {links.length > 0 && (
              <div className="space-y-1">
                {links.map((l, i) => (
                  <div key={i} className="flex items-center justify-between text-sm bg-gray-50 px-3 py-2 rounded">
                    <span className="text-gray-700">{l.platform}: <span className="text-gray-400">{l.url}</span></span>
                    <button type="button" onClick={() => removeLink(i)} className="text-red-400 text-xs ml-4">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="featured" id="featured" checked={form.featured} onChange={handleChange} />
            <label htmlFor="featured" className="text-sm" style={{ color: '#2C2A29' }}>Feature this book on the homepage</label>
          </div>

          {message && (
            <p className="text-sm font-medium" style={{ color: message.startsWith('Error') ? 'red' : '#5A6E4A' }}>
              {message}
            </p>
          )}

          <div className="flex gap-3">
            <button type="submit" disabled={loading}
              className="px-6 py-3 rounded font-semibold text-sm text-white disabled:opacity-50"
              style={{ backgroundColor: '#5A6E4A' }}>
              {loading ? 'Saving...' : editingId ? 'Update Book' : 'Add Book'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setForm(emptyForm); setLinks([]); setEditingId(null) }}
                className="px-6 py-3 rounded font-semibold text-sm border border-gray-300 text-gray-600">
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2 className="text-xl font-bold mb-6" style={{ color: '#2C2A29' }}>All Books</h2>
        <div className="space-y-4">
          {books.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-sm p-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold" style={{ color: '#2C2A29' }}>{book.title}</p>
                <p className="text-sm text-gray-500">{book.author} · {book.genre}</p>
                <p className="text-xs text-gray-400">{book.purchase_links?.length || 0} purchase link(s)</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(book)}
                  className="text-sm font-semibold underline underline-offset-4"
                  style={{ color: '#5A6E4A' }}>Edit</button>
                <button onClick={() => handleDelete(book.id)}
                  className="text-sm font-semibold text-red-400 underline underline-offset-4">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}