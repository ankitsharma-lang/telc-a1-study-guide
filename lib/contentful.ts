import { createClient } from 'contentful'

const spaceId = process.env.CONTENTFUL_SPACE_ID || ''
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || ''
const previewToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || accessToken

export const client = spaceId && accessToken
  ? createClient({ space: spaceId, accessToken })
  : null

export const previewClient = spaceId && previewToken
  ? createClient({ space: spaceId, accessToken: previewToken, host: 'preview.contentful.com' })
  : null

export function getClient(preview = false) {
  return preview ? previewClient : client
}
