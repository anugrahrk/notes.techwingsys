// app/components/TrackCard.tsx
// "use client" // This must be at the very top of the file
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
// import { useRouter } from 'next/navigation' // Correct import for App Router
import { Button } from './ui/button'
import Link from 'next/link'

const TrackCard = ({id, title, description,slug }: { id:number,title: string, description: string,slug:string }) => {
  // const router = useRouter()

  // const handleExplore = () => {
  //   // No need for event object or e.preventDefault() here.
  //   // We are simply telling the router to navigate.
  //   router.push(`/track/123`)
  // }

  return (
    <Card className='min-w-3xs z-50'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className='gap-3 max-sm:flex-col max-sm:items-stretch'>
        {/* Pass the function reference directly */}
        <Link href={`/track/${slug}`}><Button type='button'>Explore</Button></Link>
      </CardFooter>
    </Card>
  )
}

export default TrackCard