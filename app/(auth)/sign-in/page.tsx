import React from 'react'
import { Suspense } from 'react'
import Login from '../../../components/LoginForm'
import { auth } from '../../../auth'
import { redirect } from 'next/navigation'


export default async  function page() { 
  return (
    <div>
        <Suspense fallback={<p className='animate-spin py-20'>Logging in....</p>}>
          
            <Login/>
          
           
        </Suspense>
          
    </div>
  )
}
