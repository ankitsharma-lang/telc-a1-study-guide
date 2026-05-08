
'use client'
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react'

export default function PreviewProvider({ children }: { children: React.ReactNode }) {
  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={true}
      enableLiveUpdates={true}
    >
      {children}
    </ContentfulLivePreviewProvider>
  )
}
