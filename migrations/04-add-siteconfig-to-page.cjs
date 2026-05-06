module.exports = function(migration) {
  const studyPage = migration.editContentType('studyPage')
  studyPage.createField('siteConfig')
    .type('Link')
    .linkType('Entry')
    .name('Site Config')
    .validations([{ linkContentType: ['siteConfig'] }])
}
