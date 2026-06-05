const GENRES = ['All', 'Literary Fiction', 'Memoir', 'Drama', 'Poetry', 'Other']

export default function GenreFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {GENRES.map(genre => (
        <button
          key={genre}
          onClick={() => onChange(genre)}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
          style={
            selected === genre
              ? { backgroundColor: '#5A6E4A', color: 'white' }
              : { backgroundColor: '#F0EBE3', color: '#2C2A29' }
          }
        >
          {genre}
        </button>
      ))}
    </div>
  )
}