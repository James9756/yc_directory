
import Link from "next/link"
import Image from "next/image"
import {  Logout } from "../utils/AuthActions"
import { auth } from "../auth"



export default  async function NavBar() {



  const session = await auth()
  return (
    <header className='py-3 sm:px-4  bg-white shadow-sm'>
      <nav className='flex justify-between items-center '>

        <Link href="/">
          <Image

             src="/logo.png"
             width={144}
             height={30}
             alt="logo"
             loading="eager"
          />
        </Link>

        {session && session.user?(
           <div className="flex items-center gap-5">
          
          <Link href="/startup/create">Create</Link>
          <form action={Logout}>
              <button type = "submit"  className="cursor-pointer">Logout</button>
          </form>
          
          <Link href={`/user/${session?.user?.id}`} className=" cursor-pointer hidden md:flex text-xl">{(session?.user?.name).toLocaleLowerCase()}</Link> {/*profile details*/}
           

        </div>
        ):(
          <Link href="/sign-in">Login</Link>
          
        )}



       

      </nav>

    </header>
  )
}


