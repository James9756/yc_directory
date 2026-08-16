"use server"
import { signIn, signOut } from "../auth"
import {z} from "zod"
import bcrypt from "bcryptjs"
import prisma from "./prisma"
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"


const SignUpSchema = z.object({
        username:z.string().min(2, "Name must be atleast 2 characters"),
        email:z.email("Invalid email"),
        password:z.string().min(8,"Password must be atleast 8 characters"),
        imageUrl:z.url().optional().or(z.literal(""))
    
    })


export async function GithubLogin(){
    await signIn("github",{redirectTo:"/"})
}

export async function GoogleLogin(){
    await signIn("google",{redirectTo:"/"})
}
export async function Logout(){
    await signOut({redirectTo:"/"})
}

 

export async function SignUpCredentials(prevState:any, formData:FormData){

    const validated = SignUpSchema.safeParse({

        username:formData.get("username"),
        email:formData.get("email"),
        password:formData.get("password"),
        imageUrl:formData.get("imageUrl"),
        
})

    if(!validated.success){
        console.log(validated.error.flatten().fieldErrors)
        return{
            errors:validated.error.flatten().fieldErrors,
            message:"Invalid fields"
        }
    }

    const {username,email,password,imageUrl} = validated.data

    try{

        const existingUser = await prisma.user.findUnique({
            where:{email}
        })

        if(existingUser){
            return{message:"User already exist"}
        }

        const hashedPassword = await bcrypt.hash(password,10)

        await prisma.user.create({
            data:{
                name:username,
                email,
                image:imageUrl,
                password:hashedPassword,
                
                
            }
        })

    }catch(error){
           return{message:"Database error. Failed to create user"}
    }

    redirect("/login?registered=true")
   
}


export async function CredentialsLogin(prevState:any,formData:FormData){
   
    try{
       await signIn("credentials",
        {
            email:formData.get("email"),
            password:formData.get("password"),
            redirectTo:"/"
            
        }
       )
    }catch(e){
         if(e instanceof AuthError){
            return{message:"Invalid email or password"}
         }
         throw e

        console.log(e)
    }
   

    redirect("/")

}


