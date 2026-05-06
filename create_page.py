
import urllib.request
import urllib.error
import json
import time

SPACE = 'gnnmt83ffjut'
ENV = 'master'
TOKEN = 'YOUR_CMA_TOKEN_HERE'
BASE = f'https://api.contentful.com/spaces/{SPACE}/environments/{ENV}'

def req(method, path, data=None, extra=None):
    url = f'{BASE}{path}'
    body = json.dumps(data).encode() if data else None
    headers = {
        'Authorization': f'Bearer {TOKEN}',
        'Content-Type': 'application/vnd.contentful.management.v1+json',
    }
    if extra:
        headers.update(extra)
    r = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(r) as res:
            return json.loads(res.read())
    except urllib.error.HTTPError as e:
        print(f'ERROR {e.code}: {e.read().decode()[:300]}')
        return None

def create_and_publish(ct_id, fields):
    result = req('POST', '/entries', {'fields': fields}, {'X-Contentful-Content-Type': ct_id})
    if not result:
        return None
    entry_id = result['sys']['id']
    version = result['sys']['version']
    time.sleep(0.5)
    req('PUT', f'/entries/{entry_id}/published', extra={'X-Contentful-Version': str(version)})
    print(f'  Created + published [{ct_id}]: {entry_id}')
    return entry_id

def f(val):
    return {'en-US': val}

def link(entry_id):
    return {'sys': {'type': 'Link', 'linkType': 'Entry', 'id': entry_id}}

def get_all_entries(ct_id):
    result = req('GET', f'/entries?content_type={ct_id}&limit=200')
    if not result:
        return []
    return [item['sys']['id'] for item in result['items']]

print('\nTELC A1 - Creating Study Page Structure\n')

print('1. Fetching existing entries...')
grammar_ids = get_all_entries('grammarRule')
vocab_ids = get_all_entries('vocabularySet')
speaking_ids = get_all_entries('speakingPrompt')
writing_ids = get_all_entries('writingTemplate')
exam_ids = get_all_entries('examOverview')
site_config_ids = get_all_entries('siteConfig')

print(f'  grammarRule: {len(grammar_ids)} entries')
print(f'  vocabularySet: {len(vocab_ids)} entries')
print(f'  speakingPrompt: {len(speaking_ids)} entries')
print(f'  writingTemplate: {len(writing_ids)} entries')
print(f'  examOverview: {len(exam_ids)} entries')
print(f'  siteConfig: {len(site_config_ids)} entries')

print('\n2. Creating section entries...')

grammar_section_id = create_and_publish('grammarSection', {
    'title': f('Grammar'),
    'subtitle': f('Core grammar rules for TELC A1'),
    'rules': f([link(i) for i in grammar_ids]),
})

vocab_section_id = create_and_publish('vocabularySection', {
    'title': f('Vocabulary'),
    'subtitle': f('Tap a word to reveal its meaning'),
    'sets': f([link(i) for i in vocab_ids]),
})

speaking_section_id = create_and_publish('speakingSection', {
    'title': f('Speaking'),
    'subtitle': f('Click a question to see the model answer'),
    'prompts': f([link(i) for i in speaking_ids]),
})

writing_section_id = create_and_publish('writingSection', {
    'title': f('Writing Templates'),
    'subtitle': f('All TELC A1 writing scenarios'),
    'templates': f([link(i) for i in writing_ids]),
})

print('\n3. Creating studyPage entry...')

sections = []
if exam_ids:
    sections.append(link(exam_ids[0]))
if grammar_section_id:
    sections.append(link(grammar_section_id))
if vocab_section_id:
    sections.append(link(vocab_section_id))
if speaking_section_id:
    sections.append(link(speaking_section_id))
if writing_section_id:
    sections.append(link(writing_section_id))

page_fields = {
    'title': f('TELC A1 Deutsch - Study Guide'),
    'slug': f('home'),
    'sections': f(sections),
}

if site_config_ids:
    page_fields['siteConfig'] = f(link(site_config_ids[0]))

page_id = create_and_publish('studyPage', page_fields)

print('\nDone! Here is your structure:')
print(f'  studyPage ID: {page_id}')
print(f'  Sections: {len(sections)}')
print('\nGo to app.contentful.com → Content → Study Page')
print('You can now reorder, add, or remove sections from the web app!')
