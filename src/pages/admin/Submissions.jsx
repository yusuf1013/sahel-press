import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUSES = ['pending', 'reviewed', 'accepted', 'rejected']

export default function Submissions() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchSubmissions() }, [])

  async function fetchSubmissions() {
    const { data } = await supabase
      .from('submissions')
      .select('*')
      .order('submitted_at', { ascending: false })
    if (data) setSubmissions(data)
    setLoading(false)
  }

  async function updateStatus(id, status) {
    await supabase.from('submissions').update({ status }).eq('id', id)
    fetchSubmissions()
  }

  async function getDownloadUrl(manuscript_url) {
    const { data } = await supabase.storage
      .from('manuscripts')
      .createSignedUrl(manuscript_url, 60)
    if (data?.signedUrl) window.open(data.signedUrl, '_blank')
  }

  const statusColors = {
    pending: '#C8873A',
    reviewed: '#3A7EC8',
    accepted: '#5A6E4A',
    rejected: '#C84A3A',
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-10" style={{ color: '#2C2A29' }}>Submissions</h1>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : submissions.length === 0 ? (
          <p className="text-gray-400">No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {submissions.map(sub => (
              <div key={sub.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold text-lg" style={{ color: '#2C2A29' }}>{sub.manuscript_title}</h3>
                    <p className="text-sm text-gray-500">{sub.author_name} · {sub.author_email} · {sub.genre}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Submitted: {new Date(sub.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className="text-xs px-3 py-1 rounded-full font-semibold capitalize"
                    style={{ backgroundColor: statusColors[sub.status] + '22', color: statusColors[sub.status] }}
                  >
                    {sub.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{sub.bio}</p>

                <div className="flex flex-wrap gap-3 items-center">
                  <select
                    value={sub.status}
                    onChange={e => updateStatus(sub.id, e.target.value)}
                    className="px-3 py-1.5 rounded border border-gray-200 text-sm focus:outline-none"
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>

                  <button
                    onClick={() => getDownloadUrl(sub.manuscript_url)}
                    className="px-4 py-1.5 rounded text-sm font-semibold text-white"
                    style={{ backgroundColor: '#5A6E4A' }}
                  >
                    Download Manuscript
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}