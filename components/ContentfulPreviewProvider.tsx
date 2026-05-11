'use client'
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react'
import { PropsWithChildren, useEffect } from 'react'

export default function PreviewProvider({
  children,
  isDraftMode = false,
}: PropsWithChildren<{ isDraftMode?: boolean }>) {

  useEffect(() => {
    if (isDraftMode) {
      console.log('[TELC Preview] isDraftMode:', isDraftMode)
      console.log('[TELC Preview] window.parent === window:', window.parent === window)
      console.log('[TELC Preview] SDK version check — ContentfulLivePreviewProvider loaded')
    }
  }, [isDraftMode])

  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableInspectorMode={true}
      enableLiveUpdates={true}
      debugMode={true}
    >
      {children}
    </ContentfulLivePreviewProvider>
  )
}