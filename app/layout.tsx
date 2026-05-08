
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import { getNavigationMenu } from '@/lib/api'
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react'

export const metadata: Metadata = {
  title: 'TELC A1 Deutsch - Study Guide',
  description: 'Complete TELC A1 German study guide managed via Contentful CMS.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = await getNavigationMenu()
  const fields = nav?.fields as any

  const siteName = fields?.siteName || 'TELC A1 Study Guide'
  const navLinks = (fields?.navLinks || []).map((item: any) => ({
    label: item?.fields?.label || '',
    href: item?.fields?.href || '#',
    openInNewTab: item?.fields?.openInNewTab || false,
  }))
  const footerText = fields?.footerText || 'Built with Next.js and Contentful. Viel Erfolg!'
  const footerLinks = (fields?.footerLinks || []).map((item: any) => ({
    label: item?.fields?.label || '',
    href: item?.fields?.href || '#',
    openInNewTab: item?.fields?.openInNewTab || false,
  }))

  return (
    <html lang="de">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <ContentfulLivePreviewProvider
          locale="en-US"
          enableInspectorMode={true}
          enableLiveUpdates={true}
        >
          <Navbar siteName={siteName} links={navLinks} />
          <main>{children}</main>
          <Footer text={footerText} links={footerLinks} />
        </ContentfulLivePreviewProvider>
      </body>
    </html>
  )
}
