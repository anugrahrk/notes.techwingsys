
"use client" 
import { Card, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
// import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import Link from 'next/link'
import { useState } from 'react'

const TrackCard = ({id, title, cover, slug }: { id:number,title: string, cover?: string,slug:string }) => {
  // const router = useRouter()
  const [loading,setLoading]=useState(true)

  // const handleExplore = () => {
  //   router.push(`/track/123`)
  // }

  return (
    <Card className='min-w-2xs z-50 py-0 pb-5 '>
       <CardContent className='px-0'>
  {/* The Skeleton: Only show if loading is true */}
  {loading && (
    <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center aspect-video  object-cover max-w-2xs max-h-full">
      <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-base sm:w-96 rounded-t-xl">
        <svg className="w-11 h-11 text-fg-disabled" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
        </svg>
      </div>
    </div>
  )}

  {/* The Image: Always rendered, but hidden visually until loaded */}
  <img 
    src={cover} 
    onLoad={() => setLoading(false)} 
    alt='Banner'
    className={`aspect-video rounded-t-xl object-cover max-w-2xs max-h-full ${loading ? 'hidden' : 'block'}`} 
  />
</CardContent>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardFooter className='gap-3 max-sm:flex-col max-sm:items-stretch'>
        <Link href={`/track/${slug}`}><Button type='button'>Explore</Button></Link>
      </CardFooter>
    </Card>
  )
}

export default TrackCard