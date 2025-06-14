"use client"
import axios from 'axios'
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
    fetchNotes()
 
  }, [])
  
  
 
  return (
    <div className='h-screen w-screen p-5 flex flex-col gap-5 '>

      <div className='h-[20%] w-[100%] bg-zinc-900 rounded-md p-5 flex justify-between items-center'>
      <h1>Welcome Back {username} 👋</h1>
          <Link className='py-2 px-5 bg-white text-black rounded-md cursor-pointer hover:bg-gray-300' href={'/note/new'}> Create Note</Link>

      </div>
      <div className='min-h-[70%] w-full bg-zinc-900 rounded-md  '>

       {notes.length === 0 ? (
         <div className="h-full w-full flex flex-col justify-center items-center gap-2">
          <h4 className='text-zinc-400'>Noting to show, You can create one :</h4>
          <Link className='py-2 px-5 bg-white text-black rounded-md cursor-pointer hover:bg-gray-300' href={'/note/new'}> Create Note</Link>
         </div>
       ) : (
        <div className='h-full w-full flex flex-col gap-2 p-2'>
          {notes.map((note: any, idx: number) => (
            <div key={idx} className="p-5 border-b border-zinc-800">{note.title}</div>
          ))}
        </div>
       )}

      </div>
    

    </div>
  )
}

export default page


