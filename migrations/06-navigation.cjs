module.exports = function(migration) {
  const navItem = migration.createContentType('navigationItem')
    .name('Navigation Item')
    .displayField('label')
  navItem.createField('label').type('Symbol').name('Label').required(true)
  navItem.createField('href').type('Symbol').name('Href').required(true)
  navItem.createField('openInNewTab').type('Boolean').name('Open in New Tab')

  const navMenu = migration.createContentType('navigationMenu')
    .name('Navigation Menu')
    .displayField('siteName')
  navMenu.createField('siteName').type('Symbol').name('Site Name').required(true)
  navMenu.createField('navLinks').type('Array').name('Nav Links')
    .items({ type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['navigationItem'] }] })
  navMenu.createField('footerText').type('Symbol').name('Footer Text')
  navMenu.createField('footerLinks').type('Array').name('Footer Links')
    .items({ type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['navigationItem'] }] })
}
