'use client'
import { useState } from 'react'

const fallback = [
  { fields: { title: 'Shopping', words: [
    {fields:{de:'der Lachs',en:'salmon'}},{fields:{de:'die Butter',en:'butter'}},
    {fields:{de:'die Milch',en:'milk'}},{fields:{de:'der Reis',en:'rice'}},
  ]}},
  { fields: { title: 'Family', words: [
    {fields:{de:'die Mutter',en:'mother'}},{fields:{de:'der Vater',en:'father'}},
    {fields:{de:'die Schwester',en:'sister'}},{fields:{de:'der Bruder',en:'brother'}},
  ]}},
]

export default function VocabSection({ data }: { data?: any[] }) {
  const sets = (data && data.length > 0) ? data : fallback
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const toggle = (key: string) => setRevealed(r => ({ ...r, [key]: !r[key] }))

  return (
    <section id="vocab" className="max-w-6xl mx-auto px-6 py-16 section-fade">
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Vocabulary</h2>
      <p className="text-gray-500 mb-8">Tap a word to reveal its meaning</p>
      <div className="space-y-8">
        {sets.map((set: any, si: number) => {
          const title = set?.fields?.title || set?.title || 'Set '+(si+1)
          const words = set?.fields?.words || set?.words || []
          return (
            <div key={si}>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {words.map((w: any, wi: number) => {
                  const key = si+'-'+wi
                  const de = w?.fields?.de || w?.de || ''
                  const en = w?.fields?.en || w?.en || ''
                  if (!de) return null
                  return (
                    <button key={key} onClick={() => toggle(key)}
                      className="bg-white border border-gray-200 rounded-xl px-3 py-3 text-left hover:border-blue-400 hover:bg-blue-50 transition text-sm">
                      <p className="font-semibold text-gray-800">{de}</p>
                      {revealed[key]
                        ? <p className="text-blue-600 mt-1">{en}</p>
                        : <p className="text-gray-300 mt-1">tap to reveal</p>}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
