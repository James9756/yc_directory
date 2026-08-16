"use client"
import { CredentialsLogin } from '../utils/AuthActions'
import Link from 'next/link'
import { useActionState } from 'react'

export default function LoginCredetials() {
    const [state ,formAction,isPending] = useActionState(CredentialsLogin,null)

  return (
    <div>
      <form action={formAction}>
            <div className='flex flex-col w-[90vw] sm:w-[30vw] gap-2'>

            <label>Email address</label>
            <input type='text' required name='email' className='outline-none border px-3 py-2 rounded-md bg-white'/> 
            <label>Password </label>
            <input type='password' name='password' required className='outline-none border px-3 py-2 rounded-md bg-white'/> 
            <button type='submit'  disabled={isPending} className='bg-pink-500 text-white py-2 rounded-md'>{isPending?"Logging In...":"Sign In"}</button>
            </div>
          </form>
         
    </div>
  )
}
