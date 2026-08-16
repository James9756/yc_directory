import React from 'react'
import { Suspense } from 'react'
import SignUpForm from '../../../components/SignUpForm'
import { auth } from '../../../auth'
import { redirect } from 'next/navigation'
import SessionProvider from '../../../components/SessionProvider'

export default async function page() {

  const session = await auth()

  return (
    <div>
          <Suspense fallback={<div className="animate-pulse ">Creating User</div>}>
            <SessionProvider session={session}>

              <SignUpForm/>

            </SessionProvider>
             
          </Suspense>
       </div>
  )
}
