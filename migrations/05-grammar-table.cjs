module.exports = function(migration) {
  const grammar = migration.editContentType('grammarRule')
  grammar.createField('table')
    .type('Object')
    .name('Table Data')
}
