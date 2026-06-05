import BookCard from './BookCard'

export default function BookGrid({ books }) {
  if (!books || books.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        No books found.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}