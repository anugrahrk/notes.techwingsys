"use client"

import { Navbar01 } from "./ui/shadcn-io/navbar-01"
import { signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

export default function Appbar({ctaText}:{ctaText:string}){
    const router=useRouter()
    const pathname=usePathname()
    

    async function Sign(){
        if (ctaText=="Login"){
        router.push('/login')
    }else{
        signOut({callbackUrl:"/login"})
    }
    }
    
  return (
    <div>
        {pathname.startsWith("/track")?<Navbar01 hamburger={true} ctaText={ctaText} onCtaClick={Sign}/>:<Navbar01 hamburger={false} ctaText={ctaText} onCtaClick={Sign}/>}
        </div>
  )

}