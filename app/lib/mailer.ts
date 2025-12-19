"use server"
import nodemailer from 'nodemailer'

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
})
export default async function sendMail(to:string,link:string){
    await transporter.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"Reset your password",
        html:`
        <p>click here to reset password</p>
        <a href="${link}">Reset password</a>
        `
    })
    
}