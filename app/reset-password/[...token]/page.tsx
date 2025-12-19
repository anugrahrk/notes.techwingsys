"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useState } from 'react'
import axios from 'axios'
import AlertDemo from '@/components/alert'

interface Pageparams{
  params:Promise<{token:string}>
}
function Page({params}:Pageparams){
    const router=useRouter()
    
      const [isPasswordVisible, setIsPasswordVisible] = useState(false)
      const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
      const [password, setPassword] = useState("")
      const [ConfirmPassword, setConfirmPassword] = useState("")
      const [alert,setAlert]=useState(false)
      const [error,setError]=useState(false)
      const [loading,setLoading]=useState(false)

      async function resetPassword(){
        setLoading(true)
        if(password!==ConfirmPassword){
            setAlert(true)
            setError(true)
        setLoading(false)
            setTimeout(() => {
              setAlert(false)
            }, 5000);
        }else{
            const token=await params
        try{
          await axios.post('/api/auth/resetpassword',{
          token:token.token[0],
          password
        })
        setLoading(false)
        setAlert(true)
        setTimeout(() => {
        router.push('/login')
        },3000)
      }
      catch(e:any){
        setLoading(false)
        console.log("error details",e)
      }

        }
        
      }
    
  return (
    <>
    <div className="flex justify-center pt-4">{alert? <AlertDemo err={error} message={error?"password doesnot match!":"password reset successfully, redirecting to login"}/>:""}</div>
    <div className='relative flex h-auto z-100 min-h-screen items-center justify-center overflow-x-hidden px-4 py-10 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='gap-6'>

          <div>
            <CardTitle className='mb-1.5 text-2xl'>Reset Password</CardTitle>
            <CardDescription className='text-base'>
              Please enter your new password.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-4'>
           <div className='w-full space-y-1'>
                  <Label className='leading-5' htmlFor='password'>
                    New Password*
                  </Label>
                  <div className='relative'>
                    <Input
                      id='password'
                      type={isPasswordVisible ? 'text' : 'password'}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder='••••••••••••••••'
                      className='pr-9'
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => setIsPasswordVisible(prevState => !prevState)}
                      className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                    >
                      {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                      <span className='sr-only'>{isPasswordVisible ? 'Hide password' : 'Show password'}</span>
                    </Button>
                  </div>
                </div>
          
                {/* Confirm Password */}
                <div className='w-full space-y-1'>
                  <Label className='leading-5' htmlFor='confirmPassword'>
                    Confirm Password*
                  </Label>
                  <div className='relative'>
                    <Input
                      id='confirmPassword'
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                      placeholder='••••••••••••••••'
                      className='pr-9'
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() =>{ setIsConfirmPasswordVisible(prevState => !prevState)}}
                      className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
                    >
                      {isConfirmPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                      <span className='sr-only'>{isConfirmPasswordVisible ? 'Hide password' : 'Show password'}</span>
                    </Button>
                  </div>
                </div>
        </CardContent>
        <CardFooter>
            <Button className='w-full' disabled={loading} onClick={resetPassword}>
       {loading?"Loading...":"Set New Password"}
      </Button>
      
        </CardFooter>
      </Card>
    </div>
    </>
  )
}

export default Page