// "use client"
// import Searchcomponent from "@/components/searchcomponent"
import { notionRef } from "@/app/lib/notion"
import TrackCard from "@/components/trackcard"
import { Input } from "@/components/ui/input"
// import { useState } from "react"

interface BlogType{
  id:number,
  title:string,
  description:string,
  slug:string
}
async function page() {
  // const [search,setSearch]=useState(true)
  const item=await notionRef()
  return (
    <div className={`p-3 flex-wrap z-050 md:mx-20 md:my-10 `}>
      {/* {search &&<div className="fixed w-full z-100">
        <div className="flex justify-center"><Searchcomponent/></div></div> } */}

      <div className="flex justify-center pb-4"><span className="text-2xl font-medium font-sans text-gray-600">Welcome to</span></div>
      <div className="flex justify-center pb-4"><span className="md:text-6xl font-extrabold font-sans text-4xl">Projects <span className="text-blue-500">.</span> io</span></div>
      <div className="flex justify-center pb-4"><Input type={"search"} className="max-w-xl z-50 bg-gray-50 " placeholder="Search"/></div>
      <div className="flex flex-wrap gap-4 pt-4">{item?.map((blog:BlogType)=><TrackCard id={blog.id} title={blog.title} description={blog.description} slug={blog.slug}/>)}</div></div>
  )
}

export default page