import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../lib/auth'
import Appbar from '@/components/appbar'

const layout = async({children}:{children:React.ReactNode}) => {
    const session=await getServerSession(authOptions)

        // if(!session?.user){
        //         redirect('/login')
        // }
    let ctText
    if(session?.user){
        ctText="Logout"
    }
    else{
        ctText="Login"
    }
    return(
        <div>
            <Appbar ctaText={ctText}/>
            {children}
        </div>
    )
}

export default layout