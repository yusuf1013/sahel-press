import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import BookGrid from '../components/BookGrid'

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeatured() {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })

      if (!error) setFeaturedBooks(data)
      setLoading(false)
    }
    fetchFeatured()
  }, [])

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }}>

      {/* Hero */}
      <section
        className="px-6 py-24 text-white text-center"
        style={{ backgroundColor: '#2C2A29' }}
      >
        <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#C8873A' }}>
          A Literary Imprint
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Stories Rooted in the Sahel
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg mb-8">
          Sahel Press publishes African voices — fiction and non-fiction that carries the weight of the desert and the warmth of its people.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/books"
            className="px-6 py-3 rounded font-semibold text-sm transition-colors"
            style={{ backgroundColor: '#5A6E4A', color: 'white' }}
          >
            Browse Books
          </Link>
          <Link
            to="/submit"
            className="px-6 py-3 rounded font-semibold text-sm border border-gray-500 text-gray-300 hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            Submit Your Manuscript
          </Link>
        </div>
      </section>

      {/* About strip */}
      <section className="px-6 py-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#5A6E4A' }}>
            Founded by
          </p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#2C2A29' }}>
            Issoufou Boureima
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            London-based writer, forensic scientist, and founder of Sahel Press. Born in Niger's Tillabéri region, his work bridges West African oral tradition with contemporary literary fiction.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            His debut novel <em>Tea for the Chosen</em> is available now on Amazon.
          </p>
          <Link
            to="/about"
            className="text-sm font-semibold underline underline-offset-4"
            style={{ color: '#5A6E4A' }}
          >
            Read more about Sahel Press
          </Link>
        </div>
        <div
          className="rounded-lg p-8 text-center"
          style={{ backgroundColor: '#F0EBE3' }}
        >
          <div
            className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
            style={{ backgroundColor: '#C8873A' }}
          >
            IB
          </div>
          <p className="text-sm text-gray-500 italic">
            "The Sahel is not just a geography. It is a grammar of survival."
          </p>
        </div>
      </section>

      {/* Featured Books */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8" style={{ color: '#2C2A29' }}>
          Featured Books
        </h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <BookGrid books={featuredBooks} />
        )}
      </section>

    </div>
  )
}