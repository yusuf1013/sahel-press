import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const TRACKS = [
  { n: 0, title: "Welcome and how to use the audio", page: null, file: "00-welcome.mp3", group: "Start here" },
  { n: 1, title: "Asking what \u201cnot herself\u201d means", page: 8, file: "01-not-herself.mp3", group: "The shift" },
  { n: 2, title: "Never pretend you understand", page: 9, file: "02-never-pretend.mp3", group: "The shift" },
  { n: 3, title: "The 20-second report", page: 16, file: "03-20-second-report.mp3", group: "The shift" },
  { n: 4, title: "British English: toilet and personal care", page: 17, file: "04-british-toilet-personal-care.mp3", group: "British English" },
  { n: 5, title: "British English: food and drink", page: 18, file: "05-british-food-drink.mp3", group: "British English" },
  { n: 6, title: "British English: feelings and health", page: 18, file: "06-british-feelings-health.mp3", group: "British English" },
  { n: 7, title: "British English: friendly words", page: 19, file: "07-british-friendly-words.mp3", group: "British English" },
  { n: 8, title: "British English: words your colleagues use", page: 19, file: "08-british-colleague-words.mp3", group: "British English" },
  { n: 9, title: "Sound drill: numbers and word stress", page: 22, file: "09-sound-drill-numbers-stress.mp3", group: "Being understood" },
  { n: 10, title: "When you cannot understand a resident", page: 23, file: "10-cannot-understand-resident.mp3", group: "Being understood" },
  { n: 11, title: "When a resident cannot understand you", page: 24, file: "11-resident-cannot-understand-you.mp3", group: "Being understood" },
  { n: 12, title: "Refusing a shower", page: 34, file: "12-refusing-a-shower.mp3", group: "Real shift conversations" },
  { n: 13, title: "Dementia: \u201cWhere\u2019s my wife?\u201d", page: 36, file: "13-dementia-wheres-my-wife.mp3", group: "Real shift conversations" },
  { n: 14, title: "A worried relative", page: 41, file: "14-worried-relative.mp3", group: "Real shift conversations" },
  { n: 15, title: "A C-BAR report", page: 43, file: "15-cbar-report.mp3", group: "Real shift conversations" },
  { n: 16, title: "Asking about pain", page: 50, file: "16-asking-about-pain.mp3", group: "Real shift conversations" },
  { n: 17, title: "A safeguarding disclosure", page: 55, file: "17-safeguarding-disclosure.mp3", group: "Real shift conversations" },
  { n: 18, title: "Handover: change, action, outstanding", page: 76, file: "18-handover.mp3", group: "Real shift conversations" },
  { n: 19, title: "Talking to the inspector", page: 86, file: "19-talking-to-inspector.mp3", group: "Real shift conversations" },
  { n: 20, title: "Mr Khan\u2019s breakfast: refusing food and reporting it", page: 90, file: "20-mr-khan-breakfast.mp3", group: "Real shift conversations" },
  { n: 21, title: "Phrases 1 to 10: starting a conversation", page: 112, file: "21-phrases-01-10-starting.mp3", group: "The 100 phrases" },
  { n: 22, title: "Phrases 11 to 20: choice", page: 112, file: "22-phrases-11-20-choice.mp3", group: "The 100 phrases" },
  { n: 23, title: "Phrases 21 to 30: personal care", page: 113, file: "23-phrases-21-30-personal-care.mp3", group: "The 100 phrases" },
  { n: 24, title: "Phrases 31 to 40: refusal", page: 113, file: "24-phrases-31-40-refusal.mp3", group: "The 100 phrases" },
  { n: 25, title: "Phrases 41 to 50: dementia and communication", page: 114, file: "25-phrases-41-50-dementia.mp3", group: "The 100 phrases" },
  { n: 26, title: "Phrases 51 to 60: distress", page: 114, file: "26-phrases-51-60-distress.mp3", group: "The 100 phrases" },
  { n: 27, title: "Phrases 61 to 70: relatives", page: 115, file: "27-phrases-61-70-relatives.mp3", group: "The 100 phrases" },
  { n: 28, title: "Phrases 71 to 80: reporting", page: 115, file: "28-phrases-71-80-reporting.mp3", group: "The 100 phrases" },
  { n: 29, title: "Phrases 81 to 90: safeguarding", page: 116, file: "29-phrases-81-90-safeguarding.mp3", group: "The 100 phrases" },
  { n: 30, title: "Phrases 91 to 100: professional boundaries", page: 116, file: "30-phrases-91-100-boundaries.mp3", group: "The 100 phrases" },
  { n: 31, title: "Closing", page: 135, file: "31-closing.mp3", group: "Closing" },
]

function pad(n) {
  return String(n).padStart(2, '0')
}

function trackUrl(file) {
  const { data } = supabase.storage.from('audio').getPublicUrl(file)
  return data.publicUrl
}

const GROUPS = []
TRACKS.forEach(function (t) {
  if (GROUPS.indexOf(t.group) === -1) GROUPS.push(t.group)
})

export default function Audio() {
  const location = useLocation()
  const [active, setActive] = useState(null)

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (!hash) return
    setActive(hash)
    const el = document.getElementById(hash)
    if (el) {
      window.requestAnimationFrame(function () {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    }
  }, [location])

  return (
    <div style={{ backgroundColor: '#FAF7F2', minHeight: '100vh' }} className="px-6 py-12">
      <div className="max-w-2xl mx-auto">

        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#5A6E4A' }}>Free Audio Companion</p>
        <h1 className="text-4xl font-bold mb-3" style={{ color: '#2C2A29' }}>The Care Worker&rsquo;s Shift Companion</h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          Every track from the book, spoken in clear British English. Free, no sign-up.
        </p>
        <p className="text-base text-gray-600 leading-relaxed mb-10">
          Listen before a shift, on the bus or on your break. Hear it, say it, then use it. The voices are made with artificial intelligence. The words are the same as in the book.
        </p>

        {GROUPS.map(function (group) {
          return (
            <section key={group} className="mb-10">
              <h2 className="text-sm uppercase tracking-widest font-semibold mb-4" style={{ color: '#C8873A' }}>{group}</h2>
              <div className="space-y-3">
                {TRACKS.filter(function (t) { return t.group === group }).map(function (t) {
                  const anchor = 't' + pad(t.n)
                  const isActive = active === anchor
                  return (
                    <div key={t.n} id={anchor} className="rounded-lg p-5 scroll-mt-24" style={{ backgroundColor: isActive ? '#EAF0E4' : 'white', boxShadow: isActive ? '0 0 0 2px #5A6E4A' : '0 1px 2px rgba(0,0,0,0.05)' }}>
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="text-sm font-bold flex-shrink-0" style={{ color: '#5A6E4A' }}>{pad(t.n)}</span>
                        <span className="text-base font-semibold leading-snug" style={{ color: '#2C2A29' }}>{t.title}</span>
                      </div>
                      {t.page && <p className="text-xs text-gray-400 mb-3">Book page {t.page}</p>}
                      <audio controls preload="none" className="w-full" src={trackUrl(t.file)}>
                        Your browser cannot play audio. Try opening this page in Chrome or Safari.
                      </audio>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}

        <div className="rounded-lg p-6 text-center" style={{ backgroundColor: '#F0EBE3' }}>
          <p className="text-base text-gray-600 leading-relaxed">
            If a track will not play, check your connection and reload the page. Nothing downloads until you press play.
          </p>
        </div>

      </div>
    </div>
  )
}
