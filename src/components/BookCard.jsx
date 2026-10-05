import { Link } from 'react-router-dom'

export default function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer h-full">
        <div className="aspect-[2/3] overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#F0EBE3' }}>
          {book.cover_image_url ? (
            <img src={book.cover_image_url} alt={book.title} className="w-full h-full object-contain" loading="lazy" />
          ) : (
            <span className="text-sm text-gray-400 text-center px-4">{book.title}</span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm leading-tight mb-1" style={{ color: '#2C2A29' }}>{book.title}</h3>
          <p className="text-xs text-gray-500 mb-2">{book.author}</p>
          <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: '#F0EBE3', color: '#5A6E4A' }}>{book.genre}</span>
        </div>
      </div>
    </Link>
  )
}