import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <main>
    <div className='grid sm:grid-cols-12 md:grid-cols-2 text-cyan-950 text-center bg-slate-400 border-4 m-2 p-2'>
    <Link href="/">
      <div className='m-2'>        
         DASHBOARD  
        </div>
    </Link>  
    <Link href="/Notes">
      <div className='m-2'>
         NOTES 
      </div>
    </Link>
    </div>
    </main>
  )
}
