import { createClient } from 'contentful'
export const client = createClient({ space: process.env.CONTENTFUL_SPACE_ID!, accessToken: process.env.CONTENTFUL_ACCESS_TOKEN! })
export const previewClient = createClient({ space: process.env.CONTENTFUL_SPACE_ID!, accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN!, host: 'preview.contentful.com' })
export function getClient(preview = false) { return preview ? previewClient : client }
