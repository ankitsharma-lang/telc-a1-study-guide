
'use client'
import { useState } from 'react'
import { useContentfulInspectorMode, useContentfulLiveUpdates } from '@contentful/live-preview/react'

const fb = [
  { sys: { id: 'fv-1' }, fields: { title: 'Shopping', words: [
    { sys: { id: 'fvw-1' }, fields: { de: 'der Lachs', en: 'salmon' } },
    { sys: { id: 'fvw-2' }, fields: { de: 'die Butter', en: 'butter' } },
    { sys: { id: 'fvw-3' }, fields: { de: 'die Milch', en: 'milk' } },
    { sys: { id: 'fvw-4' }, fields: { de: 'der Reis', en: 'rice' } },
  ]}},
  { sys: { id: 'fv-2' }, fields: { title: 'Family', words: [
    { sys: { id: 'fvw-5' }, fields: { de: 'die Mutter', en: 'mother' } },
    { sys: { id: 'fvw-6' }, fields: { de: 'der Vater', en: 'father' } },
    { sys: { id: 'fvw-7' }, fields: { de: 'die Schwester', en: 'sister' } },
    { sys: { id: 'fvw-8' }, fields: { de: 'der Bruder', en: 'brother' } },
  ]}},
]

function VocabWord({ word, index, setId }: { word: any; index: number; setId: string }) {
  const live = useContentfulLiveUpdates(word)
  const inspectorProps = useContentfulInspectorMode({ entryId: live?.sys?.id })
  const f = live?.fields || live
  const [revealed, setRevealed] = useState(false)

  return (
    <button onClick={() => setRevealed(r => !r)}
      className="bg-white border border-gray-200 rounded-xl px-3 py-3 text-left hover:border-blue-400 hover:bg-blue-50 transition text-sm">
      <p className="font-semibold text-gray-800" {...inspectorProps({ fieldId: 'de' })}>{f.de}</p>
      {revealed
        ? <p className="text-blue-600 mt-1" {...inspectorProps({ fieldId: 'en' })}>{f.en}</p>
        : <p className="text-gray-300 mt-1">tap to reveal</p>
      }
    </button>
  )
}

function VocabSet({ entry }: { entry: any }) {
  const live = useContentfulLiveUpdates(entry)
  const inspectorProps = useContentfulInspectorMode({ entryId: live?.sys?.id })
  const f = live?.fields || live
  const words = f.words || []

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3" {...inspectorProps({ fieldId: 'title' })}>
        {f.title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {words.map((w: any, wi: number) => (
          <VocabWord key={w?.sys?.id || wi} word={w} index={wi} setId={live?.sys?.id} />
        ))}
      </div>
    </div>
  )
}

export default function VocabSection({ data }: { data?: any[] }) {
  const sets = (data && data.length > 0) ? data : fb

  return (
    <section id="vocab" className="max-w-6xl mx-auto px-6 py-16 section-fade">
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Vocabulary</h2>
      <p className="text-gray-500 mb-8">Tap a word to reveal its meaning</p>
      <div className="space-y-8">
        {sets.map((entry: any, i: number) => (
          <VocabSet key={entry?.sys?.id || i} entry={entry} />
        ))}
      </div>
    </section>
  )
}
