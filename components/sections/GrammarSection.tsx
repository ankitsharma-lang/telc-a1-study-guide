
'use client'
import { useState } from 'react'
import { useContentfulInspectorMode } from '@contentful/live-preview/react'

const fb = [
  { title: 'Nominativ', rule: 'Subject of sentence. Ask: WER?', table: [['', 'M', 'F', 'N', 'Pl'], ['def', 'der', 'die', 'das', 'die'], ['indef', 'ein', 'eine', 'ein', '-']], examples: ['Der Mann ist nett.', 'Das Kind spielt.'], tip: 'WER? or WAS?' },
  { title: 'Akkusativ', rule: 'Direct object. Maskulin: der->den, ein->einen.', table: [['', 'M', 'F', 'N', 'Pl'], ['def', 'den', 'die', 'das', 'die'], ['indef', 'einen', 'eine', 'ein', '-']], examples: ['Ich kaufe einen Stift.', 'Ich rufe meinen Vater an.'], tip: 'WEN? or WAS? after verb' },
  { title: 'Dativ', rule: 'Indirect object. After: mit, bei, nach, seit, von, zu.', table: [['', 'M', 'F', 'N', 'Pl'], ['def', 'dem', 'der', 'dem', 'den'], ['indef', 'einem', 'einer', 'einem', '-']], examples: ['Ich helfe meiner Mutter.', 'Ich fahre mit meinem Bruder.'], tip: 'WEM? to whom?' },
  { title: 'Modal: muessen & duerfen', rule: 'muessen=must, duerfen=may. Infinitive goes to END.', table: [['Person', 'muessen', 'duerfen'], ['ich', 'muss', 'darf'], ['du', 'musst', 'darfst'], ['er/sie', 'muss', 'darf'], ['wir', 'muessen', 'duerfen']], examples: ['Ich muss putzen.', 'Ich darf Kaffee machen.'], tip: 'Modal pos 2, infinitive at end' },
  { title: 'Perfekt', rule: 'haben/sein + Partizip II. Movement = sein.', table: [['Verb', 'Partizip II', 'Hilfsverb'], ['aufstehen', 'aufgestanden', 'sein'], ['fahren', 'gefahren', 'sein'], ['trinken', 'getrunken', 'haben'], ['kaufen', 'gekauft', 'haben']], examples: ['Ich bin aufgestanden.', 'Ich habe getrunken.'], tip: 'Regular: ge+stem+t' },
  { title: 'Separable Verbs', rule: 'Prefix goes to END of sentence.', table: [['Verb', 'Prefix', 'Example'], ['aufstehen', 'auf-', 'Ich stehe auf.'], ['anrufen', 'an-', 'Ich rufe an.']], examples: ['Ich stehe um 7 Uhr auf.', 'Ich rufe meinen Vater an.'], tip: 'Perfekt: aufgestanden, angerufen' },
]

export default function GrammarSection({ data }: { data?: any[] }) {
  const rules = (data && data.length > 0) ? data.map((d: any) => ({ ...d.fields, _id: d.sys?.id })) : fb
  const [open, setOpen] = useState<number | null>(0)
  const inspectorProps = useContentfulInspectorMode()

  return (
    <section id="grammar" className="max-w-6xl mx-auto px-6 py-16 section-fade">
      <h2 className="text-3xl font-bold mb-2">Grammar</h2>
      <p className="text-gray-500 mb-8">Core rules for TELC A1</p>
      <div className="space-y-3">
        {rules.map((rule: any, i: number) => (
          <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center px-6 py-4 bg-white hover:bg-gray-50 text-left">
              <span className="font-semibold"
                {...(rule._id ? inspectorProps({ entryId: rule._id, fieldId: 'title' }) : {})}>
                {rule.title}
              </span>
              <span>{open === i ? '-' : '+'}</span>
            </button>
            {open === i && (
              <div className="px-6 pb-6 bg-white">
                <p className="text-gray-600 mb-4"
                  {...(rule._id ? inspectorProps({ entryId: rule._id, fieldId: 'rule' }) : {})}>
                  {rule.rule}
                </p>
                {rule.table && (
                  <table className="w-full text-sm border-collapse mb-4">
                    <tbody>
                      {rule.table.map((row: string[], ri: number) => (
                        <tr key={ri} className={ri === 0 ? 'bg-blue-600 text-white' : ri % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          {row.map((cell: string, ci: number) => (
                            <td key={ci} className="px-3 py-2 border border-gray-200">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {rule.examples?.map((ex: string, ei: number) => (
                  <p key={ei} className="text-sm bg-blue-50 rounded-lg px-3 py-2 text-blue-800 mb-1">{ex}</p>
                ))}
                {rule.tip && (
                  <p className="text-sm bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 text-yellow-800 mt-2"
                    {...(rule._id ? inspectorProps({ entryId: rule._id, fieldId: 'tip' }) : {})}>
                    Tip: {rule.tip}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
