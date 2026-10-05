import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBook() {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single()
      if (!error) setBook(data)
      setLoading(false)
    }
    fetchBook()
  }, [id])

  if (loading) {
    return (
      <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!book) {
    return (
      <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="flex items-center justify-center">
        <p className="text-gray-500">Book not found. <Link to="/books" className="underline" style={{ color: '#5A6E4A' }}>Go back</Link></p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <Link to="/books" className="text-sm underline underline-offset-4 mb-8 inline-block" style={{ color: '#5A6E4A' }}>
          Back to Books
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mt-4">
          <div>
            <div className="rounded-lg overflow-hidden shadow-md flex items-center justify-center" style={{ backgroundColor: '#F0EBE3' }}>
              {book.cover_image_url ? (
                <img src={book.cover_image_url} alt={book.title} className="w-full h-auto object-contain" />
              ) : (
                <div className="w-full py-32 flex items-center justify-center text-gray-400 text-sm">
                  No cover available
                </div>
              )}
            </div>
          </div>

          <div>
            <span className="text-xs px-3 py-1 rounded-full font-medium mb-4 inline-block" style={{ backgroundColor: '#F0EBE3', color: '#5A6E4A' }}>{book.genre}</span>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#2C2A29' }}>{book.title}</h1>
            <p className="text-gray-500 mb-6">by {book.author}</p>

            <h3 className="text-sm uppercase tracking-widest font-semibold mb-2" style={{ color: '#C8873A' }}>Synopsis</h3>
            <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-wrap">{book.synopsis}</p>

            {book.author_bio && (
              <div className="mb-8">
                <h3 className="text-sm uppercase tracking-widest font-semibold mb-2" style={{ color: '#C8873A' }}>About the Author</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{book.author_bio}</p>
              </div>
            )}

            {book.purchase_links && book.purchase_links.length > 0 && (
              <div>
                <h3 className="text-sm uppercase tracking-widest font-semibold mb-3" style={{ color: '#C8873A' }}>Buy this Book</h3>
                <div className="flex flex-wrap gap-3">
                  {book.purchase_links.map(function (link, i) {
                    return (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded font-semibold text-sm text-white transition-opacity hover:opacity-80" style={{ backgroundColor: '#5A6E4A' }}>
                        {link.platform}
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}