import ExamOverview from '@/components/sections/ExamOverview'
import GrammarSection from '@/components/sections/GrammarSection'
import VocabSection from '@/components/sections/VocabSection'
import SpeakingSection from '@/components/sections/SpeakingSection'
import WritingSection from '@/components/sections/WritingSection'
import{getGrammarRules,getVocabSets,getWritingTemplates,getSpeakingPrompts,getExamOverview}from '@/lib/api'
export const revalidate=60
export default async function HomePage(){
const[a,b,c,d,e]=await Promise.all([getExamOverview(),getGrammarRules(),getVocabSets(),getSpeakingPrompts(),getWritingTemplates()])
return(<><section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-6 text-center"><div className="max-w-3xl mx-auto"><p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">TELC Deutsch</p><h1 className="text-5xl font-bold mb-4">A1 Study Guide</h1><p className="text-blue-100 text-lg mb-8">Grammar &middot; Vocabulary &middot; Speaking &middot; Writing</p><div className="flex flex-wrap justify-center gap-3">{['#exam','#grammar','#vocab','#speaking','#writing'].map(h=>(<a key={h} href={h} className="bg-white text-blue-700 px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition capitalize">{h.replace('#','')}</a>))}</div></div></section><ExamOverview data={a??undefined}/><GrammarSection data={b.length?b:undefined}/><VocabSection data={c.length?c:undefined}/><SpeakingSection data={d.length?d:undefined}/><WritingSection data={e.length?e:undefined}/></> )}
