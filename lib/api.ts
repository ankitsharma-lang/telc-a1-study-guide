import { getClient } from './contentful'
export async function getGrammarRules(p=false){try{const c=getClient(p);const r=await c.getEntries({content_type:'grammarRule',include:2});return r.items}catch{return[]}}
export async function getVocabSets(p=false){try{const c=getClient(p);const r=await c.getEntries({content_type:'vocabularySet',include:3});return r.items}catch{return[]}}
export async function getWritingTemplates(p=false){try{const c=getClient(p);const r=await c.getEntries({content_type:'writingTemplate',include:2});return r.items}catch{return[]}}
export async function getSpeakingPrompts(p=false){try{const c=getClient(p);const r=await c.getEntries({content_type:'speakingPrompt',include:2});return r.items}catch{return[]}}
export async function getExamOverview(p=false){try{const c=getClient(p);const r=await c.getEntries({content_type:'examOverview',limit:1});return r.items[0]||null}catch{return null}}
