import React from 'react'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Image from "next/image"
import { getPitchById } from '../../../../server/pitch'
import { notFound } from 'next/navigation'
import MarkdownPreview from '../../../../components/MarkdownPreview'



async function PitchDetails({params}:{params:Promise<{id:string}>}){
  const { id } = await params
  const post = await getPitchById(id)
  if(!post){
    notFound()
  }

  return(

    <article className='flex flex-col gap-4'>
      <header className='bg-pink-600 h-[27vh] md:h-[25vh] px-2'>
        <h1 className='heading mx-auto'>{post.title}</h1>
      </header>

       <Image
          src={post.imageUrl}
          width={800}
          height={600}
          alt='picth'
          className='w-screen h-[50vh] sm:h-[70vh] px-4'
        />

      <section className='container mx-auto px-4'>
        
        
        <div className='flex justify-between'>
        <Image
         src={post.author.image}
         width={30}
         height={30}
         alt='profile'
         className='rounded-full'
        />

        <p>{post.category}</p>
        </div>

        
        {post.pitch && (
          <div className=''>
            <h2 className='font-semibold text-2xl'>Pitch Details</h2>
          <MarkdownPreview source={post.pitch}/>
          </div>
        )}

        

      </section>
       
    </article>

  )
}


export default async function page({params}:{params:Promise<{id:string}>}) {
  
  return (
   <Suspense fallback={<p className='text-center py-20'>Loading pitch details...</p>}>
     <PitchDetails params={params}/>
   </Suspense>
  )
}
