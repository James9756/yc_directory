
import { GoogleLogin,GithubLogin } from '../utils/AuthActions'
import Link from 'next/link'
import LoginCredetials from './LoginCredetials'
import { auth } from '../auth'
import { redirect } from 'next/navigation'


export default async  function Login() {
  const session = await auth()
  
  if(session){
    redirect("/")
  }
  return (
    <div className='container mx-auto px-3 py-2 rounded-md shadow-md w-[95vw] h-[93vh] sm:w-[50vw] sm:h-[80vh] mt-10 bg-gray-50'>
       <div className='flex flex-col items-center justify-center gap-3'>
          <h1 className='text-gray-950 font-bold text-2xl'>Welcome back </h1>
          <p className='text-gray-400'>Sign in to your account to continue</p>
          <form action={GoogleLogin}>
            <button type='submit' className='border bg-white flex items-center justify-center gap-1 py-2 w-[90vw] sm:w-[30vw] rounded-md'>
              
              <span>Continue with Google</span>
            </button>
          </form>

           <form action={GithubLogin}>
            <button type='submit' className='border bg-black text-white flex items-center justify-center gap-1 py-2 w-[90vw] sm:w-[30vw] rounded-md'>
              Github 
              <span>Continue with Github</span>
            </button>
          </form>
          
          <span className='flex items-center justify-center text-gray-400'><hr className='w-20 sm:w-30'/>Or continue with <hr className='w-20 sm:w-30'/></span>

          <LoginCredetials/>
         
          <p className='flex gap-1 text-violet-900'>Dont have account? <Link href="/sign-up">Sign Up</Link></p>
          
          
      
      </div>
    </div>
  )
}
