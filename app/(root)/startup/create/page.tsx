import React from 'react'
import { Suspense } from 'react'
import StartupForm from '../../../../components/StartupForm'

export default function page() {
  return (
    <div>
      <Suspense fallback={
        <div className='flex items-center justify-center py-20'>
        <p className='text-xl font-medium animate-pulse text-gray-500'>Loadng pitch sumision form</p>
      </div>}
      >
        
        <StartupForm/>
      </Suspense>
      
    </div>
  )
}
