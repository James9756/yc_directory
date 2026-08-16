
import { Suspense } from 'react'
import SearchForm from '../../components/SearchForm'
import StartupCard from '../../components/StartupCard'
import { getPitch } from '../../server/pitch'
import prisma from '../../utils/prisma'

{/*Child component that will be wrapped in suspenses since it is dyanmic-chages overtime*/}
async function StartUpList( {searchParams} :{searchParams:Promise<{query?:string}>}) {

  const  query  = (await searchParams).query || ""
  const posts = await getPitch(query)
   
  
  return (
    <>
    <section className='bg-pink-700 h-[70vh] flex flex-col items-center gap-1 py-4 px-2 sm:h-[60vh] '>

      <h1 className='heading mx-auto'>
        Pitch your startup,<br/>
        Connect with entreprenuers

      </h1>

      <p className='text-center text-white'>
        Submit Ideas, Vote on Pitches and Get Noticed on Virtual Competitions 
      </p>

      <Suspense fallback={<p className='text-center py-10 animate-spin'>Loading Startups...</p>}>
        <SearchForm query={query}/>
      </Suspense>

       
    </section>
    <section className='section_container '>
      <p className='font-semibold text-2xl'>
        {query? `Search results for ${query}`:" All startups"}
      </p>
        
        <ul className='mt-7 card_grid'>
       
       {posts?.length > 0? (
        posts.map((post)=>(
           
            <StartupCard key={post.id} post={post}/>
            
            
        ))
       ):(
        <p>No post found</p>
       )}
      </ul>
      
    </section>
    
    </>

    

  )
}

export default function page({searchParams}:{searchParams:Promise<{query?:string}>}){

  return(
     
    <Suspense  fallback={<p className='text-center py-10'>Loading startups...</p>}>
        <StartUpList searchParams={searchParams}/>
      </Suspense>
  )
}
