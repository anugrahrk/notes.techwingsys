
import { notionRef } from '@/app/lib/notion'
import { Footer } from './footer'
import { Notioncontent } from './notioncontent'

interface BlogType{
  id:number,
  title:string,
  description:string,
  slug:string,
  cover:string
}

export const Trackpage =async ({slug}:{slug:string}) => {
  const blog=await notionRef()
  const blogItem=blog?.blogs?.find((item:BlogType)=>item.slug===slug)
  return (
    <div className='w-full min-h-screen relative'>
    {blogItem&&<Notioncontent description={blogItem.description} heading={blogItem.title} key={blogItem.id}/>}
    <div className=' fixed bottom-3 left-3'>
    <Footer/>
    </div>
    
    </div>
    
  )
}
