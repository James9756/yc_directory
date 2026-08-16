import React from 'react'
import { formatDate } from '../utils/utils'
import Link from 'next/link'
import Image from "next/image"
import { EyeIcon } from 'lucide-react'
import { title } from 'process'

type StartupCardType = {
  title:string,
  category:string,
  description:string,
  id:string,
  createdAt:Date,
  imageUrl:string,
  author:{
    id:string,
    name:string
  }
}

export default function StartupCard({post}:{post:StartupCardType}) {
  return (
    <li className='rounded-lg border-4 border-r-8 border-b-8   shadow-sm py-3 px-3 '>
        <div className='flex'>
            <p>{formatDate(post.createdAt)}</p>
            
        </div>

        <div className='flex justify-between mt-7 gap-4'>
            <div className='flex-1'>
                <Link href={`/user/${post.id}`}>
                   <p className='line-clamp-1'>{post.author.name}</p>
                 </Link>

                 <Link href={`/startup/${post.id}`} className='font-semibold text-2xl'>{post.title}</Link>
                 
             </div>

              <Link href={`/user/${post.author?.id}`}>

                   <p className='line-clamp-1'>Icon</p>
                 </Link>
            
        </div>

        <Link href={`/startup/${post.id}`} className='w-[100]'>
          <p> {post.description}</p>
          <Image
           src={post.imageUrl}
          width={400}
          height={30}
           alt='placeholder'
           className='object-cover rounded-md'
          />
        </Link>

        <div className='flex justify-between mt-3'>

          <Link href={`/startup/${post.id}`}>
            <p>{post.category}</p>
          </Link>

          <button className='bg-black text-white p-1 rounded-md'>
            <Link href={`/startup/${post.id}`}>Details</Link>
          </button>

        </div>
    </li>
  )
}
