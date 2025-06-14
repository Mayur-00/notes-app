"use client"

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import { signIn } from "next-auth/react";


const page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");

  const router = useRouter()

  const handleSubmit = async (e:any) => {

    e.preventDefault();

    console.log("in function")
    const formdata = {
      email,
      password
    };


const res = await signIn("credentials", {
      redirect:false,
      email:formdata.email,
      password:formdata.password
     });

     if(res?.error){
      console.error("Incorrect Email or Password 🙀", )
      console.log(res?.error)
     };

     if(res?.url){
      console.log("Signin success 😻");
      router.replace("/home")
     }


   
  }
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
        <h1>login page</h1>
      <form className='h-100 w-150 bg-zinc-600 flex flex-col items-center p-20 gap-2 '  onSubmit={handleSubmit} >
        <input type="email" className='py-2 px-5 bg-gray-400 rounded text-black' value={email}  onChange={(e)=> setEmail(e.target.value)} placeholder='Email' />
        <input type="password" className='py-2 px-5 bg-gray-400 rounded text-black' value={password}  onChange={(e)=> setPassword(e.target.value)} placeholder='Password' />
        <button type='submit' className='py-1 px-5 bg-blue-600 rounded'>login</button>
      </form>
    </div>
  )
}

export default page