module.exports = function(migration) {

  const grammarSection = migration.createContentType('grammarSection')
    .name('Grammar Section').displayField('title')
  grammarSection.createField('title').type('Symbol').name('Title').required(true)
  grammarSection.createField('subtitle').type('Symbol').name('Subtitle')
  grammarSection.createField('rules').type('Array').name('Grammar Rules')
    .items({ type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['grammarRule'] }] })

  const vocabSection = migration.createContentType('vocabularySection')
    .name('Vocabulary Section').displayField('title')
  vocabSection.createField('title').type('Symbol').name('Title').required(true)
  vocabSection.createField('subtitle').type('Symbol').name('Subtitle')
  vocabSection.createField('sets').type('Array').name('Vocabulary Sets')
    .items({ type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['vocabularySet'] }] })

  const speakingSection = migration.createContentType('speakingSection')
    .name('Speaking Section').displayField('title')
  speakingSection.createField('title').type('Symbol').name('Title').required(true)
  speakingSection.createField('subtitle').type('Symbol').name('Subtitle')
  speakingSection.createField('prompts').type('Array').name('Speaking Prompts')
    .items({ type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['speakingPrompt'] }] })

  const writingSection = migration.createContentType('writingSection')
    .name('Writing Section').displayField('title')
  writingSection.createField('title').type('Symbol').name('Title').required(true)
  writingSection.createField('subtitle').type('Symbol').name('Subtitle')
  writingSection.createField('templates').type('Array').name('Writing Templates')
    .items({ type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['writingTemplate'] }] })

  const studyPage = migration.createContentType('studyPage')
    .name('Study Page').displayField('title')
  studyPage.createField('title').type('Symbol').name('Title').required(true)
  studyPage.createField('slug').type('Symbol').name('Slug').required(true)
  studyPage.createField('sections').type('Array').name('Sections')
    .items({ type: 'Link', linkType: 'Entry',
      validations: [{ linkContentType: ['examOverview','grammarSection','vocabularySection','speakingSection','writingSection'] }]
    })
}
