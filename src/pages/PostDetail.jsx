import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()
      if (data) setPost(data)
      setLoading(false)
    }
    fetchPost()
  }, [id])

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="flex items-center justify-center">
        <p className="text-gray-500">Post not found. <Link to="/news" className="underline" style={{ color: '#5A6E4A' }}>Go back</Link></p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/news" className="text-sm underline underline-offset-4 mb-8 inline-block" style={{ color: '#5A6E4A' }}>
          Back to News
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8 mt-4">
          <div className="flex items-center gap-3 mb-4">
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

          <h1 className="text-3xl font-bold mb-6" style={{ color: '#2C2A29' }}>{post.title}</h1>

          <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </div>
    </div>
  )
}