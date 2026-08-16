"use client"
import Link from 'next/link'
import React from 'react'
import { useState,useActionState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import { SignUpCredentials } from '../utils/AuthActions'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'


export default function SignUpForm() {

  const {data:session} = useSession()

  const [imageDetails, setImageDetails] = useState<{url:string, publicId:string} | null>(null)
  const [state, formAction, isPending] = useActionState(SignUpCredentials,null)

  if(session){
    redirect("/")
  }

  return (
    <div className='container mx-auto px-3 py-3 rounded-md shadow-md w-[95vw] h:100vh sm:w-[50vw]  mt-10 bg-gray-50'>
     <div className='flex flex-col justify-center items-center'>
        <h1 className='text-gray-950 font-bold text-2xl'>Create Account</h1>
        <form action={formAction}>
            <div className='flex flex-col w-[90vw] sm:w-[30vw] gap-2 my-3'>
              <input type='hidden'name='imageUrl' value={imageDetails?.url || ""}/>
               <input type='hidden'name='publicId' value={imageDetails?.publicId || ""}/>
                <label>Username</label>
                <input
                type='text'
                required
                name='username'
                className='outline-none border px-3 py-2 rounded-md bg-white'
                />

                <label>Email</label>
                <input
                type='email'
                name='email'
                required
                className='outline-none border px-3 py-2 rounded-md bg-white'
                />

                <label>Password</label>
                <input
                type='password'
                name='password'
                required
                className='outline-none border px-3 py-2 rounded-md bg-white'
                />
                
                

                <label>Profile Picture</label>

                <CldUploadWidget
                        
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
                            
                            onSuccess={(result) => {
                             if(result.info && typeof result.info !== "string"){
                              setImageDetails({
                                url:result.info.secure_url,
                                publicId:result.info.public_id
                              });
                
                             }
                
                            }}
                          >
                            {({ open }) => (
                              <button
                                type="button"
                                onClick={() => open()}
                                className="w-full border-2 border-dashed p-3 rounded-full font-semibold hover:bg-gray-50"
                              >
                                {imageDetails? "Change Upload Image" : "Select & Upload Image"}
                              </button>
                            )}
                          </CldUploadWidget>

                          {imageDetails && (
                  <CldImage
                    src={imageDetails.url}
                    width={400}
                    height={250}
                    crop="fill"
                    alt="Preview"
                    className="rounded-lg mt-2"
                   />
              )}
                
               <button type='submit'  disabled={isPending} className='bg-pink-500 text-white py-2 rounded-md mt-2'>{isPending? "Creating Account..":"Sign Up"}</button>
            </div>
        </form>
        <p className='flex gap-1 text-violet-800'>Have account? <Link href="/sign-in">Sign In</Link></p>

     </div>
      
    </div>
  )
}
