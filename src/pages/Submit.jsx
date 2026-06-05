import { useState } from 'react'
import { supabase } from '../lib/supabase'

const GENRES = ['Literary Fiction', 'Memoir', 'Drama', 'Poetry', 'Other']

export default function Submit() {
  const [form, setForm] = useState({
    author_name: '',
    author_email: '',
    manuscript_title: '',
    genre: '',
    bio: '',
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleFile(e) {
    const selected = e.target.files[0]
    if (!selected) return

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (!validTypes.includes(selected.type)) {
      setError('Only .pdf or .docx files are allowed.')
      return
    }
    if (selected.size > 10 * 1024 * 1024) {
      setError('File must be under 10MB.')
      return
    }
    setError('')
    setFile(selected)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!file) {
      setError('Please attach your manuscript file.')
      return
    }

    setLoading(true)

    try {
      // Upload file to Supabase storage
      const fileName = `${Date.now()}_${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('manuscripts')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const manuscript_url = fileName

      // Save submission to database
      const { error: insertError } = await supabase
        .from('submissions')
        .insert([{ ...form, manuscript_url }])

      if (insertError) throw insertError

      setMessage('Thank you! We will review your manuscript within 6 weeks.')
      setForm({
        author_name: '',
        author_email: '',
        manuscript_title: '',
        genre: '',
        bio: '',
      })
      setFile(null)
    } catch (err) {
      // Fallback to localStorage if Supabase fails
      const submissions = JSON.parse(localStorage.getItem('submissions') || '[]')
      submissions.push({ ...form, fileName: file.name, submittedAt: new Date().toISOString() })
      localStorage.setItem('submissions', JSON.stringify(submissions))
      setMessage('Demo mode: submission saved locally. Thank you!')
    }

    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#5A6E4A' }}>Open Submissions</p>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2C2A29' }}>Submit Your Manuscript</h1>
        <p className="text-gray-500 mb-10">
          We read every submission. Response within 6 weeks. PDF or DOCX only, max 10MB.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Full Name</label>
            <input
              name="author_name"
              value={form.author_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Email Address</label>
            <input
              type="email"
              name="author_email"
              value={form.author_email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Manuscript Title</label>
            <input
              name="manuscript_title"
              value={form.manuscript_title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Genre</label>
            <select
              name="genre"
              value={form.genre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="">Select a genre</option>
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Author Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 rounded border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="Tell us about yourself and your writing..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: '#2C2A29' }}>Manuscript File (.pdf or .docx)</label>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFile}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {message && <p className="text-sm font-medium" style={{ color: '#5A6E4A' }}>{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded font-semibold text-sm text-white transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ backgroundColor: '#5A6E4A' }}
          >
            {loading ? 'Submitting...' : 'Submit Manuscript'}
          </button>
        </form>
      </div>
    </div>
  )
}