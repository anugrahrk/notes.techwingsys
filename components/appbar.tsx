"use client"

import { Navbar01 } from "./ui/shadcn-io/navbar-01"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default async function Appbar({ctaText}:{ctaText:string}){
    const router=useRouter()
    
    async function Sign(){
        if (ctaText=="Login"){
        router.push('/login')
    }else{
        signOut({callbackUrl:"/login"})
    }
    }
    
  return (
    <div>
        <Navbar01 ctaText={ctaText} onCtaClick={Sign}/></div>
  )

}