import CredentialsProvider  from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { prisma } from '../../lib/prisma'
import { Prisma } from '../../generated/prisma/client'
import { AuthOptions } from 'next-auth'

export const authOptions:AuthOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID||"",
            clientSecret:process.env.GOOGLE_CLIENT_SECRET||"",
            async profile(profile){
                let user=await prisma.user.findFirst({
                    where:{
                        providerAccountId:profile.sub
                    }
                })
                if(!user && profile.email){
                    user=await prisma.user.findFirst({
                        where:{
                            email:profile.email
                        }
                    })
                }
                if(!user){
                    user=await prisma.user.create({
                        data:{
                            email:profile.email,
                            name:profile.name,
                            provider:"google",
                            providerAccountId:profile.sub
                        }
                    })
                }
                return{
                    id:user.id.toString(),
                    name:user.name,
                    email:user.email
                }
            }
        }),
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                email:{label:"email",type:"text",placeholder:"m@example.com"},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials:any){
                const Hashedpassword=await bcrypt.hash(credentials.password,10)
                
                const existingUser=await prisma.user.findFirst({
                    where:{
                        email:credentials.email
                    }
                })
                if(existingUser){
                    const passwordValidation = await bcrypt.compare(credentials.password,existingUser.password||"")
                    if(passwordValidation){
                        return{
                            id:existingUser.id.toString(),
                            name:existingUser.name,
                            email:existingUser.email
                        }
                    }
                    return null
                }
                try{
                    const newUserPayload:Prisma.UserCreateInput={
                        email:credentials.email,
                        password:Hashedpassword
                    }
                    const newUser=await prisma.user.create({
                        data:newUserPayload
                    })
                    return {
                        id:newUser.id.toString(),
                        name:newUser.name,
                        email:newUser.email
                    }
                }
                catch(e){
                    console.log(e)
                }
             return null   
            }
        })
    ],
    secret:process.env.JWT_SECRET||"secret",
    callbacks:{
        async session({session,token}:any){
            session.user.id=token.sub
            return session
        }
    }
}