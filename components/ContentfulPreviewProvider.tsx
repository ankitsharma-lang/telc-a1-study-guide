'use client'
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react'
import { PropsWithChildren } from 'react'

export default function PreviewProvider({
  children,
  isDraftMode = false,
}: PropsWithChildren<{ isDraftMode?: boolean }>) {
  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={isDraftMode}
      enableLiveUpdates={isDraftMode}
      debugMode={isDraftMode}
    >
      {children}
    </ContentfulLivePreviewProvider>
  )
}