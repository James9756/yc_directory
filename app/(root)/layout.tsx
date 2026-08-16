import { Suspense } from "react";
import NavBar from "../../components/NavBar";



export default function layout({children}:Readonly<{children:React.ReactNode}>) {
  return (
    <main className="font-work-sans">
      <Suspense fallback={<div className="h-14 bg-gray-100 animate-pulse"/>}>
         <NavBar/>
      </Suspense>
        
        <div className=""> 
          {children}
        </div>
       
        
    </main>
  )
}
