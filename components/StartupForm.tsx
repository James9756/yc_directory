
"use client"
import { useActionState, useState } from "react"

import { CldUploadWidget, CldImage } from "next-cloudinary";
import dynamic from "next/dynamic";
import { createStartup } from "../server/pitch";


 const MDEditor = dynamic(()=> import("@uiw/react-md-editor"), {ssr:false})

export default function StartupForm() {
  
  const [pitch,setPitch] = useState<string | undefined>()
  
  const [imageDetails,setImageDetails] = useState<{url:string; publicId:string}| null>(null)
  

  const [state,formAction,isPending] = useActionState(createStartup,null);
 
  return (
    <form className='' action={formAction}>
      
       <header className='bg-pink-600 h-[27vh] flex items-center justify-center px-2'>
         <h1 className='heading'>Submit your startup</h1>
       </header>
       <input type="hidden" name="pitch" value={pitch || ""}/>
       <input type="hidden" name="link" value={imageDetails?.url || ""}/>
       <input type="hidden" name="publicId" value={imageDetails?.publicId || ""}/>

       <div className='flex flex-col  md:items-center  gap-3 py-5'>

        <div className='flex flex-col md:w-[40vw] px-6 gap-2'>
        <label className='font-semibold'>
          TITLE
        </label>

        <input
         type='text'
         name='title'
         id='title'
         placeholder='Startup Title...'
         required
         className='outline-none border-2 py-2 px-4 rounded-full font-semibold'
        />
        
        
        </div>

      <div className='flex flex-col md:w-[40vw] px-6 gap-2'>
        <label className='font-semibold'>
          DESCRIPTION
        </label>
        <textarea
         
         name='description'
         id='description'
         placeholder='Startup Description...'
         required
         
         className='outline-none border-2  px-2 py-2 rounded-md font-semibold'
        />
        
        
        </div>

         <div className='flex flex-col md:w-[40vw] px-6 gap-2'>
        <label className='font-semibold'>
          CATEGORY
        </label>
        <input
         type='text'
         name='category'
         id='category'
         placeholder='Category (Health,Tech...)'
         required
         className='outline-none border-2  px-4 py-2 rounded-full font-semibold'
        />
        
        
        </div>

         <div className='flex flex-col md:w-[40vw] px-6 gap-2'>
        <label className='font-semibold'>
          IMAGE URL
        </label>
        <input
         type='hidden'
         name='link'
         id='link'
         placeholder='Startup Image URL...'
         required
         className='outline-none border-2 px-4 py-2 rounded-full font-semibold'
        />
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

        
        </div>

         <div className='flex flex-col md:w-[40vw] px-6 gap-2' data-color-mode="light">
        <label className='font-semibold'>
          PITCH DETAILS
        </label>
        <MDEditor
        value={pitch}
        onChange={setPitch}
        className="py-4 h-[30vh]"
        />
        
        
        </div>

         <div className='flex flex-col md:w-[40vw] px-6 gap-2 mt-3'>
      <button  type="submit" disabled={isPending || !imageDetails}  className="bg-pink-600 text-white p-2 rounded-full font-semibold disabled:bg-pink-400 mt-2">{imageDetails ? "Upload an image": isPending? "Submitting startup":"Submit"}</button>
        
        </div>

       </div>
    </form>
  )
}

