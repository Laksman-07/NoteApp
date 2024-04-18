import React from 'react'
import NoteList from './NoteList'
import Link from 'next/link'

export default function Notes() {
  return (
    <main>
    <div className='grid grid-cols-2 m-5'>
      <div className='font-bold'>
      <h1 > TO-DO </h1>
      </div>
      <div className='flex justify-end mx-10'>
      <Link href="/AddNote">
      <button className='btn-primary'>
        Add New Note
      </button>
      </Link>
      </div>
      
    </div>
    <div>
      <NoteList />
    </div>
    </main>
  )
}
