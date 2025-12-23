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
        signOut({callbackUrl:"/"})
    }
    }
// if you need hamburger then make hamburger true
  return (
    <div className="no-print fixed w-full z-500 top-0">
        {pathname.startsWith("/track")?<Navbar01 hamburger={false} ctaText={ctaText} onCtaClick={Sign}/>:<Navbar01 hamburger={false} ctaText={ctaText} onCtaClick={Sign}/>}
        </div>
  )

}