module.exports = function(migration) {
  const siteConfig = migration.createContentType('siteConfig')
    .name('Site Config')
    .displayField('siteName')

  siteConfig.createField('siteName').type('Symbol').name('Site Name').required(true)
  siteConfig.createField('heroTitle').type('Symbol').name('Hero Title')
  siteConfig.createField('heroSubtitle').type('Symbol').name('Hero Subtitle')
  siteConfig.createField('heroImage').type('Link').linkType('Asset').name('Hero Image')
}
