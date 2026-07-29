import { Link } from 'react-router-dom'

const SONGS = [
  { title: 'Daisy Bell (A Bicycle Built for Two)', note: 'Traditional, 1892' },
  { title: 'You Are My Sunshine', note: 'Davis and Mitchell, 1939' },
  { title: "We'll Meet Again", note: 'Parker and Charles, 1939' },
  { title: 'Que Sera, Sera', note: 'Livingston and Evans, 1955' },
  { title: 'My Bonnie Lies Over the Ocean', note: 'Traditional' },
]

function youtubeLink(title) {
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(title)
}

export default function Remember() {
  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-12">
      <div className="max-w-2xl mx-auto">

        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#5A6E4A' }}>Companion Page</p>
        <h1 className="text-4xl font-bold mb-3" style={{ color: '#2C2A29' }}>Remember Together</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">
          Welcome. This page belongs with your book. Here you will find the songs from Chapter 10, and printable copies of the life story and photograph pages.
        </p>

        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#2C2A29' }}>Songs to Share</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            Tap any song to play it. There is no need to sing along. Listening, humming, tapping, and swaying are all joining in.
          </p>

          <div className="space-y-3">
            {SONGS.map((song, i) => (
              <a key={i} href={youtubeLink(song.title)} target="_blank" rel="noopener noreferrer" className="block rounded-lg px-5 py-4 transition-opacity hover:opacity-80" style={{ backgroundColor: '#F0EBE3' }}>
                <span className="block text-lg font-semibold" style={{ color: '#2C2A29' }}>{song.title}</span>
                <span className="block text-sm text-gray-500 mt-1">{song.note}</span>
              </a>
            ))}
          </div>

          <p className="text-sm text-gray-400 mt-6 leading-relaxed">
            Songs open on YouTube. Sahel Press does not host or own these recordings.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#2C2A29' }}>Printable Pages</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            Extra copies of the My Story and My Photographs pages, free to print at home as many times as you like.
          </p>

          <div className="space-y-3">
            <a href="/printables/my-story.pdf" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-5 py-4 text-lg font-semibold transition-opacity hover:opacity-80" style={{ backgroundColor: '#5A6E4A', color: 'white' }}>
              My Story pages (PDF)
            </a>
            <a href="/printables/my-photographs.pdf" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-5 py-4 text-lg font-semibold transition-opacity hover:opacity-80" style={{ backgroundColor: '#5A6E4A', color: 'white' }}>
              My Photographs pages (PDF)
            </a>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-3" style={{ color: '#2C2A29' }}>A Reminder</h2>
          <ul className="space-y-2 text-base text-gray-600 leading-relaxed list-disc pl-5">
            <li>There are no wrong answers.</li>
            <li>Ask what a page brings to mind, rather than whether it is remembered.</li>
            <li>Ten good minutes beat one difficult hour.</li>
            <li>Stop while it is still enjoyable.</li>
          </ul>
        </section>

        <div className="text-center">
          <Link to="/books" className="text-base font-semibold underline underline-offset-4" style={{ color: '#5A6E4A' }}>
            See all Sahel Press books
          </Link>
        </div>

      </div>
    </div>
  )
}