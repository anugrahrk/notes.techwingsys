"use client"
import Center from "@/components/ui/center"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle, FaSpinner } from "react-icons/fa";
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { signIn, useSession } from 'next-auth/react'
import AlertDemo from "@/components/alert"
import { useRouter } from "next/navigation"

export default function CardDemo() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === "authenticated") {
      router.push('/')
    }
  }, [status, router])

  async function Signin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("") 

    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false
    })

    if (res?.error) {
      setError("Invalid email or password")
      setLoading(false)
    } else {
      router.push("/")
    }
  }

  function Googlesignin() {
    signIn('google', { callbackUrl: "/" })
  }
  if (status === "loading") {
    return (
      <Center>
        <FaSpinner className="animate-spin text-2xl" />
      </Center>
    )
  }

  return (
    <>
      <div className="flex justify-center pt-4">
        {error !== "" ? <AlertDemo err={true} message={error} /> : ""}
      </div>
      <Center>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={Signin}>
              <div className="flex flex-col gap-6 pb-5">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer"
                      onClick={() => router.push('/forgotpassword')}
                    >
                      Forgot your password?
                    </button>
                  </div>
                  <Input 
                    id="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    required 
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                Login {loading && <FaSpinner className="ml-2 animate-spin" />}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button variant="outline" onClick={Googlesignin} className="w-full">
              <FaGoogle className="mr-2" /> Login with Google
            </Button>
          </CardFooter>
        </Card>
      </Center>
    </>
  )
}