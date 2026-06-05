import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import BookGrid from '../components/BookGrid'
import GenreFilter from '../components/GenreFilter'

export default function Books() {
  const [books, setBooks] = useState([])
  const [filtered, setFiltered] = useState([])
  const [genre, setGenre] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBooks() {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) {
        setBooks(data)
        setFiltered(data)
      }
      setLoading(false)
    }
    fetchBooks()
  }, [])

  useEffect(() => {
    if (genre === 'All') {
      setFiltered(books)
    } else {
      setFiltered(books.filter(b => b.genre === genre))
    }
  }, [genre, books])

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#2C2A29' }}>All Books</h1>
        <p className="text-gray-500 mb-8">Browse the full Sahel Press catalogue.</p>

        <div className="mb-8">
          <GenreFilter selected={genre} onChange={setGenre} />
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <BookGrid books={filtered} />
        )}
      </div>
    </div>
  )
}