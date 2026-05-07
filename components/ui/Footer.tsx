
type FooterLink = { label: string; href: string; openInNewTab?: boolean }

export default function Footer({ text, links = [] }: { text?: string; links?: FooterLink[] }) {
  const fallbackLinks: FooterLink[] = [
    { label: 'Manage Content', href: 'https://app.contentful.com', openInNewTab: true },
    { label: 'TELC Official', href: 'https://www.telc.net', openInNewTab: true },
  ]

  const footerLinks = links.length > 0 ? links : fallbackLinks

  return (
    <footer className="bg-gray-50 border-t py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
        <p className="font-semibold text-gray-700 mb-1">TELC A1 Deutsch - Study Guide</p>
        <p>{text}</p>
        <p className="mt-3">
          {footerLinks.map((l, i) => (
            <a key={i} href={l.href}
              target={l.openInNewTab ? '_blank' : undefined}
              rel={l.openInNewTab ? 'noopener noreferrer' : undefined}
              className="text-blue-500 hover:underline mr-4">
              {l.label}
            </a>
          ))}
        </p>
      </div>
    </footer>
  )
}
