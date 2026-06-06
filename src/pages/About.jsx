import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-16">
      <div className="max-w-3xl mx-auto">

        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#5A6E4A' }}>About</p>
        <h1 className="text-4xl font-bold mb-6" style={{ color: '#2C2A29' }}>Sahel Press</h1>

        <p className="text-gray-600 leading-relaxed mb-6">
          Sahel Press is an independent literary imprint based in London, founded by Issoufou Boureima. 
          We publish fiction and non-fiction rooted in the cultures, landscapes, and people of the Sahel region 
          and broader Africa — stories that deserve a global stage.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          Our mission is simple: to amplify African literary voices that are too often overlooked by mainstream 
          publishing. We believe that the Sahel — one of the world's most misunderstood regions — holds some 
          of its most compelling stories.
        </p>

        <div
          className="rounded-lg p-8 mb-10"
          style={{ backgroundColor: '#F0EBE3' }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
              style={{ backgroundColor: '#C8873A' }}
            >
              IB
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: '#2C2A29' }}>Issoufou Boureima</h2>
              <p className="text-sm text-gray-500">Founder, Sahel Press</p>
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            Issoufou Boureima is a writer, forensic scientist, and educator based in London. He holds an MSc in Forensic Chemistry and Toxicology and a BSc in Physics.
          </p>
          <p className="text-gray-600 leading-relaxed mb-3">
            His debut novel, <em>Tea for the Chosen</em>, blends West African oral traditions with contemporary literary fiction, exploring themes of identity, culture, memory, and science across the Sahel.
          </p>
          <p className="text-gray-600 leading-relaxed mb-3">
            He is the founder of Sahel Press, an independent publishing venture dedicated to amplifying African voices and stories. Through Sahel Press, he seeks to create a platform for authentic, thought-provoking literature that bridges cultures and brings underrepresented perspectives to a global audience.
          </p>
          <p className="text-gray-600 leading-relaxed">
            When not writing, Issoufou continues his work in science and education while developing new literary projects inspired by the history, people, and landscapes of West Africa.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4" style={{ color: '#2C2A29' }}>Submit Your Work</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          We accept manuscript submissions from African authors year-round. We are particularly interested 
          in literary fiction, memoir, and poetry rooted in African experience. All submissions are reviewed 
          within six weeks.
        </p>
        <Link
          to="/submit"
          className="inline-block px-6 py-3 rounded font-semibold text-sm text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#5A6E4A' }}
        >
          Submit a Manuscript
        </Link>

      </div>
    </div>
  )
}