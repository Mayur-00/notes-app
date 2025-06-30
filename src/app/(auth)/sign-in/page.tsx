"use client"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from 'react-hook-form'; // ✅ only useForm from here
import { Form } from '@/components/ui/form'; // ✅ Form from ShadCN
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader, Loader2 } from 'lucide-react';
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { signinSchema } from '@/schemas/signInSchema'


const page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

   const form = useForm<z.infer<typeof signinSchema>>({
      resolver: zodResolver(signinSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
 
  const handleSubmit = async (data:z.infer<typeof signinSchema>) => {

    console.log(data);

    try {
      setIsSubmitting(true)
      
      const res = await signIn("credentials", {
      redirect:false,
      email:data.email,
      password:data.password
     });
     console.log(res)
      toast.success("Signin success 😻");
      router.push("/dashboard")
    
    } catch (error:any) {
      toast.error("Incorrect Email or Password 🙀", )
      console.log(error)
      
    } finally{
      setIsSubmitting(false);
    }



   
  }
  return (
   <div className="min-h-screen paper-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold handwritten mb-2">Paper Notes</h1>
          <p className="text-gray-600 handwritten text-lg">{"Start your digital notebook"}</p>
        </div>

        {/* Signup Form */}
        <div className="paper-bg note-shadow rounded-lg p-8 border-2 border-gray-200">
          <h2 className="text-2xl font-bold handwritten mb-6 text-center">Welcome Back 👋</h2>

          <div className="space-y-6">
             <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                     
                    />
                  </FormControl>
              
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      {...field}
                     
                    />
                  </FormControl>
                
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='btn-paper text-black w-full  hover:bg-black hover:text-white' disabled={isSubmitting} >
              {
                isSubmitting ? ( 
                  <>
                  <Loader className="mr-2 h-4 w-4 animate-spin"/>
                  </>
                ) : ('Sign-In')
              }

            </Button>
          </form>
        </Form>

          <div className="text-center mt-6">
            <p className="text-gray-600 handwritten">
              Doesn't have an account?{" "}
              <Link href="/sign-up" className="underline hover:no-underline">
                Sign-up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default page