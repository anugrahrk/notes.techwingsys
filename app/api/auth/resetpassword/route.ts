import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

export async function POST(req:Request){
    try{
        const { token,password }=await req.json()
        // console.log(token)
        const resetToken=await prisma.passwordResetToken.findFirst({
            where:{
                expiresAt:{gt:new Date()}
            }
        })
        if(!resetToken){
            return NextResponse.json({message:"Token expired or invalid"},{status:400})
        }
        const isValid=await bcrypt.compare(token,resetToken.token)
        if(!isValid){
            return NextResponse.json({message:"Invalid Token"},{status:400})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        await prisma.user.update({
            where:{id:resetToken.userId},
            data:{password:hashedPassword}
        })
        await prisma.passwordResetToken.delete({
            where:{id:resetToken.id}
        })
        return NextResponse.json({message:"password updated successfull"})
        }
        catch(e:any){
            return NextResponse.json({message:"Server Error",e},{status:500})

        }
}