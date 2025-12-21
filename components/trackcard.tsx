// app/components/TrackCard.tsx
"use client" // This must be at the very top of the file
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
// import { useRouter } from 'next/navigation' // Correct import for App Router
import { Button } from './ui/button'
import Link from 'next/link'
import { useState } from 'react'

const TrackCard = ({id, title, cover, slug }: { id:number,title: string, cover?: string,slug:string }) => {
  // const router = useRouter()
  const [loading,setLoading]=useState(true)

  // const handleExplore = () => {
  //   // No need for event object or e.preventDefault() here.
  //   // We are simply telling the router to navigate.
  //   router.push(`/track/123`)
  // }

  return (
    <Card className='min-w-2xs z-50'>
       {/* <CardContent className='px-0'>
        <img
          src={cover}
          onLoad={()=>setLoading(false)}
          alt='Banner'
          className={`aspect-video rounded-t-xl object-cover max-w-2xs max-h-full ${loading?"opacity-0":"opacity-100"}`} 
        />
      </CardContent> */}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardFooter className='gap-3 max-sm:flex-col max-sm:items-stretch'>
        {/* Pass the function reference directly */}
        <Link href={`/track/${slug}`}><Button type='button'>Explore</Button></Link>
      </CardFooter>
    </Card>
  )
}

export default TrackCard