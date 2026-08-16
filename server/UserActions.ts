"use server"
import { redirect } from "next/navigation"
import { auth } from "../auth"
import prisma from "../utils/prisma"
export async function getUserById(id:string){

    const session = await auth()

    if(!session || !session.user.id){
        redirect("/")
    }

    const user = await prisma.user.findUnique({
        where:{
            id:id
        }
    })
 return user

}

export async function updateUserProfile(id:string){

    const session = await auth()

    if(!session || !session.user.id){
        redirect("Unathorized")
    }

    const updateProfile = await prisma.user.update({
        where:{id:session.user.id},
        data:{
            name:session.user.name,
            email:session.user.email,
            image:session.user.image

        }
    })

}