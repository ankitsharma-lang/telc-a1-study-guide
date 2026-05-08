
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const d = await draftMode()
  d.disable()
  redirect('/')
}
