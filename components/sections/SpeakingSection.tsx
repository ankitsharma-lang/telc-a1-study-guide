
'use client'
import { useState } from 'react'
import { useContentfulInspectorMode, useContentfulLiveUpdates } from '@contentful/live-preview/react'

const fb = [
  { sys: { id: 'fs-1' }, fields: { category: 'Work (Arbeit)', question: 'Wo arbeitest du?', modelAnswer: 'Ich arbeite bei einer Firma in Berlin.' } },
  { sys: { id: 'fs-2' }, fields: { category: 'Work (Arbeit)', question: 'Wie viele Stunden arbeitest du?', modelAnswer: 'Ich arbeite acht Stunden pro Tag.' } },
  { sys: { id: 'fs-3' }, fields: { category: 'Work (Arbeit)', question: 'Was machst du in der Pause?', modelAnswer: 'In der Pause trinke ich Kaffee und esse ein Brot.' } },
  { sys: { id: 'fs-4' }, fields: { category: 'Family (Familie)', question: 'Hast du Geschwister?', modelAnswer: 'Ja, ich habe eine Schwester. Sie heisst Sarah.' } },
  { sys: { id: 'fs-5' }, fields: { category: 'Family (Familie)', question: 'Wann besuchst du deine Familie?', modelAnswer: 'Ich besuche meine Familie im Winter.' } },
  { sys: { id: 'fs-6' }, fields: { category: 'Daily Routine (Alltag)', question: 'Wann stehst du auf?', modelAnswer: 'Ich stehe um sieben Uhr auf.' } },
  { sys: { id: 'fs-7' }, fields: { category: 'Daily Routine (Alltag)', question: 'Was kochst du gern?', modelAnswer: 'Ich koche gern Pasta.' } },
  { sys: { id: 'fs-8' }, fields: { category: 'Shopping (Einkaufen)', question: 'Was kostet ein Liter Milch?', modelAnswer: 'Ein Liter Milch kostet etwa 1,20 Euro.' } },
]

function SpeakingCard({ entry, index, show, toggle }: { entry: any; index: number; show: Record<string, boolean>; toggle: (k: string) => void }) {
  const live = useContentfulLiveUpdates(entry)
  const inspectorProps = useContentfulInspectorMode({ entryId: live?.sys?.id })
  const f = live?.fields || live
  const key = live?.sys?.id || String(index)

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => toggle(key)}
        className="w-full flex justify-between items-center px-5 py-3 bg-white hover:bg-gray-50 text-left">
        <span className="font-medium text-gray-800 text-sm" {...inspectorProps({ fieldId: 'question' })}>
          {f.question}
        </span>
        <span className="text-gray-400">{show[key] ? '-' : '+'}</span>
      </button>
      {show[key] && (
        <div className="px-5 py-3 bg-green-50 border-t">
          <p className="text-sm text-green-800 font-medium" {...inspectorProps({ fieldId: 'modelAnswer' })}>
            {f.modelAnswer}
          </p>
        </div>
      )}
    </div>
  )
}

export default function SpeakingSection({ data }: { data?: any[] }) {
  const entries = (data && data.length > 0) ? data : fb
  const [show, setShow] = useState<Record<string, boolean>>({})
  const toggle = (key: string) => setShow(s => ({ ...s, [key]: !s[key] }))

  const map: Record<string, any[]> = {}
  entries.forEach((e: any) => {
    const cat = e?.fields?.category || e?.category || 'General'
    if (!map[cat]) map[cat] = []
    map[cat].push(e)
  })

  return (
    <section id="speaking" className="max-w-6xl mx-auto px-6 py-16 section-fade">
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Speaking</h2>
      <p className="text-gray-500 mb-8">Click a question to see the model answer</p>
      <div className="space-y-8">
        {Object.entries(map).map(([cat, items]) => (
          <div key={cat}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{cat}</h3>
            <div className="space-y-2">
              {items.map((entry: any, i: number) => (
                <SpeakingCard key={entry?.sys?.id || i} entry={entry} index={i} show={show} toggle={toggle} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
