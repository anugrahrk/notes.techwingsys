"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition, useState } from 'react'
import { forgotPassword } from '../lib/forgotpassword'
import AlertDemo from '@/components/alert'


function Page() {
    const router=useRouter()
    const [email,setEmail]=useState("")
    const [message,setMessage]=useState("")
    const [notify,setNotify]=useState(false)
    const [isPending,startTransition]=useTransition()
    function Sendmail(){
      startTransition(async()=>{
        await forgotPassword(email)
        setMessage("If the email exists, a reset link has been sent.")
        setNotify(true)
        setTimeout(()=>setNotify(false),5000)
      })
    }
  return (
    <div className=''>
      {notify&&<div className='flex justify-center pt-4'><AlertDemo message={message} err={false} /></div>}
      
    <div className='relative flex h-auto z-100 min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='gap-6'>

          <div>
            <CardTitle className='mb-1.5 text-2xl'>Forgot Password</CardTitle>
            <CardDescription className='text-base'>
              Please enter your email associated with your account.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-4'>

            <div className='space-y-1'>
        <Label className='leading-5' htmlFor='userEmail'>
          Email address*
        </Label>
        <Input type='email' onChange={(e)=>setEmail(e.target.value)} id='userEmail' placeholder='Enter your email address' />
        
      </div>
        </CardContent>
        <CardFooter>
            <Button className='w-full' disabled={isPending} onClick={()=>{
              Sendmail()

            }}>
      {isPending?"Sending...":"Send Verification Mail"}
      </Button>
      
        </CardFooter>
        <a className='group mx-auto flex w-fit items-center gap-2 cursor-pointer'>
            <ChevronLeftIcon className='size-5 transition-transform duration-200 group-hover:-translate-x-0.5 ' />
            <span onClick={()=>router.push('/login')}>Back to login</span>
          </a>
      </Card>
    </div>
    </div>
  )
}

export default Page