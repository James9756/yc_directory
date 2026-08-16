"use server"
import { auth } from "../auth"
import prisma from "../utils/prisma"
import { redirect } from "next/navigation"
import { updateTag, cacheTag } from "next/cache"

export async function createStartup(prevState:any, formData:FormData){

    const session = await auth()

    if(!session || !session.user?.id){

        redirect("/")
    }
    const title = formData.get("title") as string
    const description = formData.get("description")as string
    const category = formData.get("category")as string
    const link = formData.get("link")as string
    const publicId = formData.get("publicId") as string
    const pitch =  formData.get("pitch") as string

    try{
 
        await prisma.pitch.create({
            data:{
                title,
                description,
                category,
                imageUrl:link,
                publicId,
                pitch,

                author :{
                    connect:{
                        id: session.user.id
                    }
                }

                
            }
        })
    }catch(error){
      

        console.error("Database error", error)
         return "Something went wrong"
}
updateTag("all-pitches")

 redirect("/")
    }

   
export async function getPitch(query:string){
    "use cache"

    cacheTag("all-pitches")

    const posts = await prisma.pitch.findMany({
        where:{
            ...(query && {
                OR:[
                    {title:{contains:query, mode:"insensitive"}},
                    {description:{contains:query, mode:"insensitive"}},
                    {category:{contains:query,mode:"insensitive"}},
                    
                ]
            }),
        },
            include:{
                author:true,
                
            }
        
    })
  return posts
}

export async function getPitchById(id:string){
    "use cache"

    cacheTag(`pitch-${id}`)
    const post = await prisma.pitch.findUnique({
        where:{
             id:id
        },

        include:{
            author:true
        }
    })
    return post;
}