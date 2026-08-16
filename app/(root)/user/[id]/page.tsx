import React, { Suspense } from 'react'
import { getUserById } from '../../../../server/UserActions'
import Image from "next/image"
import { auth } from '../../../../auth'

async function UserProfile({params}:{params:Promise<{id:string}>}){

  const { id } = await params
  const user = await getUserById(id)
  const session = await auth()
 
  return(

    <div className=' container mx-auto rounded-md shadow-md md:w-[50vw] py-4 px-4 mt-9'>
      <form className='flex flex-col items-center justify-center gap-4 py-3'>
        <Image
        src={session.user.image || ""}
        width={80}
        height={80}
        alt='profile'
        className='rounded-full'
        />
        <input
        
        defaultValue={session.user.name}
        className='border outline-none px-2 py-2 w-[90vw] sm:w-[30vw] text-center rounded-md'
        />

        <input
        
        defaultValue={session.user.email}
         className='border outline-none px-2 py-2 w-[90vw] sm:w-[30vw] text-center rounded-md'
        />
      </form>
    </div>
  )
}

export default function page( {params}:{params:Promise<{id:string}>}) {
  return (

    <section>
      <h1 className='text-center mt-3 text-2xl text-gray-950 font-bold'>User Details</h1>
      <Suspense fallback={<p className='text-center py-20'>Loading user profile....</p>}>
        <UserProfile params={params}/>
      </Suspense>
    </section>
    
  )
}
