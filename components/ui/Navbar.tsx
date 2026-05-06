"use client"
import Link from 'next/link'
import{useState}from 'react'
const links=[{href:'#exam',label:'Exam'},{href:'#grammar',label:'Grammar'},{href:'#vocab',label:'Vocab'},{href:'#speaking',label:'Speaking'},{href:'#writing',label:'Writing'}]
export default function Navbar(){const[open,setOpen]=useState(false)
return(<nav className="sticky top-0 z-50 bg-white border-b shadow-sm"><div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"><Link href="/" className="text-lg font-bold text-blue-600">TELC A1 Study Guide</Link><div className="hidden md:flex gap-6">{links.map(l=>(<a key={l.href} href={l.href} className="text-sm text-gray-600 hover:text-blue-600 font-medium">{l.label}</a>))}</div><button className="md:hidden" onClick={()=>setOpen(!open)}>{open?'X':'Menu'}</button></div>{open&&<div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">{links.map(l=>(<a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="text-sm text-gray-700">{l.label}</a>))}</div>}</nav>)}
