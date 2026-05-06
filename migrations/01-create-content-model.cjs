module.exports = function(migration) {
  const exam = migration.createContentType('examOverview').name('Exam Overview').displayField('level')
  exam.createField('level').type('Symbol').name('Level').required(true)
  exam.createField('provider').type('Symbol').name('Provider')
  exam.createField('passMark').type('Symbol').name('Pass Mark')
  exam.createField('tip').type('Text').name('Tip')

  const grammar = migration.createContentType('grammarRule').name('Grammar Rule').displayField('title')
  grammar.createField('title').type('Symbol').name('Title').required(true)
  grammar.createField('rule').type('Text').name('Rule')
  grammar.createField('examples').type('Array').name('Examples').items({ type: 'Symbol' })
  grammar.createField('tip').type('Symbol').name('Tip')
  grammar.createField('sortOrder').type('Integer').name('Sort Order')

  const vocabItem = migration.createContentType('vocabularyItem').name('Vocabulary Item').displayField('de')
  vocabItem.createField('de').type('Symbol').name('German').required(true)
  vocabItem.createField('en').type('Symbol').name('English').required(true)

  const vocabSet = migration.createContentType('vocabularySet').name('Vocabulary Set').displayField('title')
  vocabSet.createField('title').type('Symbol').name('Title').required(true)
  vocabSet.createField('words').type('Array').name('Words').items({ type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['vocabularyItem'] }] })

  const speaking = migration.createContentType('speakingPrompt').name('Speaking Prompt').displayField('category')
  speaking.createField('category').type('Symbol').name('Category').required(true)
  speaking.createField('question').type('Symbol').name('Question').required(true)
  speaking.createField('modelAnswer').type('Text').name('Model Answer')

  const writing = migration.createContentType('writingTemplate').name('Writing Template').displayField('title')
  writing.createField('title').type('Symbol').name('Title').required(true)
  writing.createField('category').type('Symbol').name('Category').validations([{ in: ['Einladung','Absage','Anfrage','Beschwerde','Mitteilung','Glueckwunsch'] }])
  writing.createField('greeting').type('Symbol').name('Greeting')
  writing.createField('body').type('Text').name('Body').required(true)
  writing.createField('closing').type('Symbol').name('Closing')
}
