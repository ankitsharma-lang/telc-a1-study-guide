
'use client'
import Link from 'next/link'
import { useState } from 'react'

type NavLink = { label: string; href: string; openInNewTab?: boolean }

export default function Navbar({ siteName = 'TELC A1 Study Guide', links = [] }: { siteName?: string; links?: NavLink[] }) {
  const [open, setOpen] = useState(false)

  const fallbackLinks: NavLink[] = [
    { label: 'Exam', href: '#exam' },
    { label: 'Grammar', href: '#grammar' },
    { label: 'Vocab', href: '#vocab' },
    { label: 'Speaking', href: '#speaking' },
    { label: 'Writing', href: '#writing' },
  ]

  const navLinks = links.length > 0 ? links : fallbackLinks

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-blue-600">
          {siteName}
        </Link>
        <div className="hidden md:flex gap-6">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              target={l.openInNewTab ? '_blank' : undefined}
              rel={l.openInNewTab ? 'noopener noreferrer' : undefined}
              className="text-sm text-gray-600 hover:text-blue-600 font-medium transition">
              {l.label}
            </a>
          ))}
        </div>
        <button className="md:hidden text-gray-600" onClick={() => setOpen(!open)}>
          {open ? 'X' : 'Menu'}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-sm text-gray-700 font-medium">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
