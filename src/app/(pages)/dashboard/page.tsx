"use client"
import NavBar from '@/components/NavBar'
import NotesGrid from '@/components/NotesGrid'
import SearchComponent from '@/components/SearchComponent'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'

const page =  () => {
  const [notes, setNotes] = useState([])

  const session =  useSession();
  const username = session.data?.user.username

  const fetchNotes =  async ()=>{
    
    const res = await axios.get("/api/note/get-notes");

    console.log(res.data.notes ,  res.data)

    setNotes(res.data.notes)
  };


  useEffect(() => {
    // fetchNotes()
 
  }, [])
  
  
 
  return (
    <div className='h-screen w-screen max-w-screen overflow-x-hidden flex flex-col items-center gap-5 bg-white dark:bg-neutral-900'>
      <NavBar/>
     <main className='max-w-6xl h-[85%]  py-8'>
       <Link  href={"/editor"} className=' h-10 w-40  rounded bg-white dark:bg-neutral-700 text-black dark:text-neutral-300 dark:hover:bg-neutral-600  mb-8 flex items-center justify-center gap-2 text-lg font-bold border-1 border-black'><Plus/> <span>New Note</span></Link>
        <NotesGrid />
        <SearchComponent/>
     </main>


    </div>
  )
}

export default page


