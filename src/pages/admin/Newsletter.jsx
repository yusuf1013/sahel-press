import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Newsletter() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchSubscribers() }, [])

  async function fetchSubscribers() {
    const { data } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false })
    if (data) setSubscribers(data)
    setLoading(false)
  }

  function exportCSV() {
    const rows = [['Email', 'Subscribed At']]
    subscribers.forEach(s => rows.push([s.email, new Date(s.subscribed_at).toLocaleDateString()]))
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'subscribers.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function deleteSubscriber(id) {
    if (!window.confirm('Remove this subscriber?')) return
    await supabase.from('newsletter_subscribers').delete().eq('id', id)
    fetchSubscribers()
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: '#2C2A29' }}>Newsletter</h1>
            <p className="text-gray-500 mt-1">{subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={exportCSV}
            className="px-5 py-2.5 rounded font-semibold text-sm text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#5A6E4A' }}
          >
            Export CSV
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : subscribers.length === 0 ? (
          <p className="text-gray-400">No subscribers yet.</p>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: '#F0EBE3' }}>
                <tr>
                  <th className="text-left px-6 py-3 font-semibold" style={{ color: '#2C2A29' }}>Email</th>
                  <th className="text-left px-6 py-3 font-semibold" style={{ color: '#2C2A29' }}>Subscribed</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub, i) => (
                  <tr key={sub.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-3 text-gray-700">{sub.email}</td>
                    <td className="px-6 py-3 text-gray-500">
                      {new Date(sub.subscribed_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => deleteSubscriber(sub.id)}
                        className="text-red-400 text-xs underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}