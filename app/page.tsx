
import { getStudyPage, getGrammarRules, getVocabSets, getWritingTemplates, getSpeakingPrompts, getExamOverview } from '@/lib/api'
import { draftMode } from 'next/headers'
import GrammarSection from '@/components/sections/GrammarSection'
import VocabSection from '@/components/sections/VocabSection'
import SpeakingSection from '@/components/sections/SpeakingSection'
import WritingSection from '@/components/sections/WritingSection'
import ExamOverview from '@/components/sections/ExamOverview'
import React from 'react'

export const revalidate = 60

export default async function HomePage() {
  const { isEnabled: preview } = await draftMode()

  const [page, examData, grammarData, vocabData, speakingData, writingData] = await Promise.all([
    getStudyPage(preview),
    getExamOverview(preview),
    getGrammarRules(preview),
    getVocabSets(preview),
    getSpeakingPrompts(preview),
    getWritingTemplates(preview),
  ])

  const siteConfig = (page?.fields?.siteConfig as any)?.fields
  const heroImage = siteConfig?.heroImage?.fields?.file?.url
  const heroTitle = siteConfig?.heroTitle || 'A1 Study Guide'
  const heroSubtitle = siteConfig?.heroSubtitle || 'Grammar · Vocabulary · Speaking · Writing — everything you need to pass.'

  const sections: any[] = (page?.fields?.sections as any[]) || []
  const sectionOrder = sections.map((s: any) => s?.sys?.contentType?.sys?.id)

  const sectionComponents: Record<string, React.ReactElement> = {
    examOverview:      <ExamOverview    key="exam"     data={examData    || undefined} />,
    grammarSection:    <GrammarSection  key="grammar"  data={grammarData.length  ? grammarData  : undefined} />,
    vocabularySection: <VocabSection    key="vocab"    data={vocabData.length    ? vocabData    : undefined} />,
    speakingSection:   <SpeakingSection key="speaking" data={speakingData.length ? speakingData : undefined} />,
    writingSection:    <WritingSection  key="writing"  data={writingData.length  ? writingData  : undefined} />,
  }

  const renderedSections = sectionOrder.length > 0
    ? sectionOrder.map((ct: string) => sectionComponents[ct] || null)
    : Object.values(sectionComponents)

  return (
    <>
      <section className="relative min-h-[500px] flex items-center justify-center text-white text-center px-6">
        {heroImage
          ? <img src={`https:${heroImage}`} alt="Hero background" className="absolute inset-0 w-full h-full object-cover" />
          : <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800" />
        }
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-3">TELC Deutsch</p>
          <h1 className="text-5xl font-bold mb-4">{heroTitle}</h1>
          <p className="text-blue-100 text-lg mb-8">{heroSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['#exam', '#grammar', '#vocab', '#speaking', '#writing'].map(h => (
              <a key={h} href={h} className="bg-white text-blue-700 px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition capitalize">
                {h.replace('#', '')}
              </a>
            ))}
          </div>
        </div>
      </section>
      {preview && (
        <div className="bg-yellow-400 text-yellow-900 text-center py-2 text-sm font-semibold">
          Preview Mode active — showing draft content
        </div>
      )}
      {renderedSections}
    </>
  )
}
