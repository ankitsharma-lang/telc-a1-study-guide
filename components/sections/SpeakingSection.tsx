'use client'
import { useState } from 'react'

const fallback = [
  { category: 'Work', prompts: [
    { q: 'Wo arbeitest du?', a: 'Ich arbeite in Berlin.' },
    { q: 'Wie viele Stunden arbeitest du?', a: 'Ich arbeite acht Stunden pro Tag.' },
  ]},
  { category: 'Family', prompts: [
    { q: 'Hast du Geschwister?', a: 'Ja, ich habe eine Schwester.' },
    { q: 'Wann besuchst du deine Familie?', a: 'Ich besuche meine Familie im Winter.' },
  ]},
  { category: 'Daily Routine', prompts: [
    { q: 'Wann stehst du auf?', a: 'Ich stehe um sieben Uhr auf.' },
    { q: 'Was kochst du gern?', a: 'Ich koche gern Pasta.' },
  ]},
]

export default function SpeakingSection({ data }: { data?: any[] }) {
  const [show, setShow] = useState<Record<string, boolean>>({})
  const toggle = (key: string) => setShow(s => ({ ...s, [key]: !s[key] }))

  // Group flat Contentful entries by category
  let categories: any[] = fallback
  if (data && data.length > 0) {
    const map: Record<string, any[]> = {}
    data.forEach((item: any) => {
      const cat = item?.fields?.category || item?.category || 'General'
      const q = item?.fields?.question || item?.question || ''
      const a = item?.fields?.modelAnswer || item?.modelAnswer || ''
      if (!map[cat]) map[cat] = []
      if (q) map[cat].push({ q, a })
    })
    categories = Object.entries(map).map(([category, prompts]) => ({ category, prompts }))
  }

  return (
    <section id="speaking" className="max-w-6xl mx-auto px-6 py-16 section-fade">
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Speaking</h2>
      <p className="text-gray-500 mb-8">Click a question to see the model answer</p>
      <div className="space-y-8">
        {categories.map((cat: any, ci: number) => (
          <div key={ci}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{cat.category}</h3>
            <div className="space-y-2">
              {cat.prompts.map((p: any, pi: number) => {
                const key = ci+'-'+pi
                return (
                  <div key={key} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => toggle(key)}
                      className="w-full flex justify-between items-center px-5 py-3 bg-white hover:bg-gray-50 text-left">
                      <span className="font-medium text-gray-800 text-sm">{p.q}</span>
                      <span className="text-gray-400">{show[key] ? '-' : '+'}</span>
                    </button>
                    {show[key] && (
                      <div className="px-5 py-3 bg-green-50 border-t">
                        <p className="text-sm text-green-800 font-medium">{p.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
