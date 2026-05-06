import type{Metadata}from 'next'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
export const metadata:Metadata={title:'TELC A1 Deutsch - Study Guide',description:'Complete TELC A1 German study guide managed via Contentful.'}
export default function RootLayout({children}:{children:React.ReactNode}){
return(<html lang="de"><body className="bg-gray-50 text-gray-900 antialiased"><Navbar/><main>{children}</main><Footer/></body></html>)}
