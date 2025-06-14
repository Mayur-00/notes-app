"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const router = useRouter()

  const handleSubmit = async (e:any) => {

    e.preventDefault();

    console.log("in function")
    const formdata = {
      username,
      email,
      password
    };



    const res = await axios.post('/api/auth/sign-up', formdata);

    if(res.data.success){
      console.log("signup success");
      router.replace('/sign-in');

    };
    console.log(res.data)


   
  }
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <form className='h-100 w-150 bg-zinc-600 flex flex-col items-center p-20 gap-2 '  onSubmit={handleSubmit} >
        <input type="text" value={username} className='py-2 px-5 bg-gray-400 rounded text-black'  onChange={(e)=> setUsername(e.target.value)} placeholder='Username' />
        <input type="email" className='py-2 px-5 bg-gray-400 rounded text-black' value={email}  onChange={(e)=> setEmail(e.target.value)} placeholder='Email' />
        <input type="password" className='py-2 px-5 bg-gray-400 rounded text-black' value={password}  onChange={(e)=> setPassword(e.target.value)} placeholder='Password' />
        <button type='submit' className='py-1 px-5 bg-blue-600 rounded'>regester</button>
      </form>
    </div>
  )
}

export default page