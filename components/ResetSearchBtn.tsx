"use client"

import { X } from 'lucide-react'
import Link from 'next/link'

export default function ResetSearchBtn() {

    const handleReset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement

        if(form) form.reset()
    }
  return (
    <button type="reset" onClick={handleReset}>
        <Link href='/'>
          <X className='size-5 cursor-pointer'/>
        </Link>
    </button>
  )
}
