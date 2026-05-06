import{NextRequest,NextResponse}from 'next/server'
import{revalidatePath}from 'next/cache'
export async function POST(request:NextRequest){
const secret=request.nextUrl.searchParams.get('secret')
if(secret!==process.env.CONTENTFUL_REVALIDATE_SECRET)return NextResponse.json({error:'Invalid secret'},{status:401})
revalidatePath('/')
return NextResponse.json({revalidated:true,now:Date.now()})}
