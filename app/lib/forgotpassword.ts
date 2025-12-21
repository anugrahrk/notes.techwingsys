"use server"
import { prisma } from "@/lib/prisma"
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import sendMail from "@/app/lib/mailer"

export async function forgotPassword(email:string){

        const user=await prisma.user.findUnique({
            where:{
                email
        }
    })
    if(!user){
        return {success:true} //here its true so that no one find out which users exist in you db
    }
    const token=crypto.randomBytes(32).toString('hex')
    const hashedtoken=await bcrypt.hash(token,10)
    await prisma.passwordResetToken.create({
        data:{
            userId:user.id,
            token:hashedtoken,
            expiresAt:new Date(Date.now()+1000*60*10)
        }
    })
    const resetLink=`${process.env.NEXTAUTH_URL}/reset-password/${token}`

    await sendMail(email,resetLink)
    
    return {success:true}
}
