import { Link } from 'react-router-dom'

export default function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`}>
      <div
        className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
      >
        <div className="aspect-[2/3] overflow-hidden bg-gray-100">
          {book.cover_image_url ? (
            <img
              src={book.cover_image_url}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-center p-4"
              style={{ backgroundColor: '#FAF7F2' }}
            >
              <span className="text-sm text-gray-400">{book.title}</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm leading-tight mb-1" style={{ color: '#2C2A29' }}>
            {book.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{book.author}</p>
          <span
            className="text-xs px-2 py-1 rounded-full font-medium"
            style={{ backgroundColor: '#F0EBE3', color: '#5A6E4A' }}
          >
            {book.genre}
          </span>
        </div>
      </div>
    </Link>
  )
}