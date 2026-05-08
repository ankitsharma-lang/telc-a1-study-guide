
'use client'
import { useState } from 'react'
import { useContentfulInspectorMode, useContentfulLiveUpdates } from '@contentful/live-preview/react'

const cats = ['All', 'Einladung', 'Absage', 'Anfrage', 'Beschwerde', 'Mitteilung', 'Glueckwunsch']

const fb = [
  { sys: { id: 'fw-1' }, fields: { category: 'Einladung', title: 'Party-Einladung', greeting: 'Hallo Max,', body: 'Ich mache am Samstag eine Party.\nIch lade euch alle herzlich ein.\nDie Party beginnt um 22 Uhr.\nDu musst unbedingt kommen!', closing: 'Viele Gruesse,\nMax' } },
  { sys: { id: 'fw-2' }, fields: { category: 'Einladung', title: 'Geburtstagseinladung', greeting: 'Liebe Sarah,', body: 'Am Sonntag ist mein Geburtstag!\nIch mache eine Feier zu Hause.\nDie Feier beginnt um 15 Uhr.', closing: 'Herzliche Gruesse,\nMax' } },
  { sys: { id: 'fw-3' }, fields: { category: 'Absage', title: 'Termin absagen', greeting: 'Hallo Maria,', body: 'Es tut mir leid, aber ich kann heute nicht kommen.\nIch bin krank.\nKann ich einen neuen Termin bekommen?', closing: 'Mit freundlichen Gruessen,\nMax' } },
  { sys: { id: 'fw-4' }, fields: { category: 'Anfrage', title: 'Anfrage Deutschkurs', greeting: 'Sehr geehrte Damen und Herren,', body: 'Ich interessiere mich fuer einen Deutschkurs.\nWann beginnt der naechste Kurs?\nWie viel kostet der Kurs?', closing: 'Mit freundlichen Gruessen,\nMax Mueller' } },
  { sys: { id: 'fw-5' }, fields: { category: 'Beschwerde', title: 'Reklamation Amazon', greeting: 'Sehr geehrte Damen und Herren,', body: 'Ich habe bei Amazon Socken bestellt.\nSie waren zu klein.\nBitte senden Sie mir mein Geld zurueck.', closing: 'Mit freundlichen Gruessen,\nMax Mueller' } },
  { sys: { id: 'fw-6' }, fields: { category: 'Mitteilung', title: 'Adressaenderung', greeting: 'Hallo,', body: 'Ich bin umgezogen.\nMeine neue Adresse: Musterstrasse 5, 10115 Berlin.', closing: 'Vielen Dank,\nMax Mueller' } },
  { sys: { id: 'fw-7' }, fields: { category: 'Glueckwunsch', title: 'Geburtstagswuensche', greeting: 'Liebe Mutter,', body: 'Herzlichen Glueckwunsch zum Geburtstag!\nIch wuensche dir alles Gute.\nIch rufe dich heute Abend an.', closing: 'In Liebe,\nMax' } },
]

function WritingCard({ entry, index, open, setOpen }: { entry: any; index: number; open: number | null; setOpen: (i: number | null) => void }) {
  const live = useContentfulLiveUpdates(entry)
  const inspectorProps = useContentfulInspectorMode({ entryId: live?.sys?.id })
  const f = live?.fields || live

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(open === index ? null : index)}
        className="w-full flex justify-between items-center px-6 py-4 bg-white hover:bg-gray-50 text-left">
        <div>
          <span className="font-semibold text-gray-800" {...inspectorProps({ fieldId: 'title' })}>{f.title}</span>
          <span className="ml-3 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{f.category}</span>
        </div>
        <span>{open === index ? '-' : '+'}</span>
      </button>
      {open === index && (
        <div className="px-6 pb-6 bg-gray-50 border-t">
          <div className="bg-white rounded-xl p-5 mt-3 font-mono text-sm leading-7 whitespace-pre-line">
            <span {...inspectorProps({ fieldId: 'greeting' })}>{f.greeting}</span>
            {'\n\n'}
            <span {...inspectorProps({ fieldId: 'body' })}>{f.body}</span>
            {'\n\n'}
            <span {...inspectorProps({ fieldId: 'closing' })}>{f.closing}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function WritingSection({ data }: { data?: any[] }) {
  const entries = (data && data.length > 0) ? data : fb
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState<number | null>(null)

  const filtered = filter === 'All'
    ? entries
    : entries.filter((e: any) => (e?.fields?.category || e?.category) === filter)

  return (
    <section id="writing" className="max-w-6xl mx-auto px-6 py-16 section-fade">
      <h2 className="text-3xl font-bold mb-2">Writing Templates</h2>
      <p className="text-gray-500 mb-6">All TELC A1 writing scenarios</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map(c => (
          <button key={c} onClick={() => { setFilter(c); setOpen(null) }}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${filter === c ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border-gray-200'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((entry: any, i: number) => (
          <WritingCard key={entry?.sys?.id || i} entry={entry} index={i} open={open} setOpen={setOpen} />
        ))}
      </div>
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
        <p className="font-bold text-yellow-800 mb-2">Writing Checklist</p>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>Start: Hallo / Liebe / Sehr geehrte Damen und Herren</li>
          <li>Write 3-4 sentences minimum</li>
          <li>Answer ALL task points</li>
          <li>Close: Viele Gruesse / Mit freundlichen Gruessen + name</li>
          <li>Verb always in position 2</li>
        </ul>
      </div>
    </section>
  )
}
