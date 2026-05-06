
import { getClient } from './contentful'

export async function getGrammarRules(preview = false) {
  try { const c = getClient(preview); if (!c) return []; const r = await c.getEntries({ content_type: 'grammarRule', include: 2 }); return r.items } catch { return [] }
}

export async function getVocabSets(preview = false) {
  try {
    const c = getClient(preview)
    if (!c) return []
    const r = await c.getEntries({ content_type: 'vocabularySet', include: 3 } as any)
    return r.items.map((set: any) => {
      const words = (set.fields.words || []).map((word: any) => {
        if (word?.fields) return word
        const resolved = r.includes?.Entry?.find((e: any) => e.sys.id === word?.sys?.id)
        return resolved || word
      })
      return { ...set, fields: { ...set.fields, words } }
    })
  } catch { return [] }
}

export async function getWritingTemplates(preview = false) {
  try { const c = getClient(preview); if (!c) return []; const r = await c.getEntries({ content_type: 'writingTemplate', include: 2 }); return r.items } catch { return [] }
}

export async function getSpeakingPrompts(preview = false) {
  try { const c = getClient(preview); if (!c) return []; const r = await c.getEntries({ content_type: 'speakingPrompt', include: 2 }); return r.items } catch { return [] }
}

export async function getExamOverview(preview = false) {
  try { const c = getClient(preview); if (!c) return null; const r = await c.getEntries({ content_type: 'examOverview', limit: 1 }); return r.items[0] || null } catch { return null }
}

export async function getStudyPage(preview = false) {
  try {
    const c = getClient(preview)
    if (!c) return null
    const r = await c.getEntries({
      content_type: 'studyPage',
      'fields.slug': 'home',
      include: 5,
      limit: 1,
    } as any)
    return r.items[0] || null
  } catch { return null }
}
