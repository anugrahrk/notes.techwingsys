"use client"

import { Input } from "@/components/ui/input"
import TrackCard from "@/components/trackcard"
import { useState } from "react"

interface BlogType {
  id: number
  title: string
  description: string
  slug: string
  cover: string
}

export default function SearchClient({ blogs }: { blogs: BlogType[] }) {
  const [search, setSearch] = useState("")
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-3 flex-wrap md:mx-20 my-20">
      <div className="flex justify-center ">
        <span className="text-2xl font-medium text-gray-600">Welcome to</span>
        <div className="sr-only">Techwingsys kochi</div>
      </div>

      <div className="flex justify-center pb-4">
        <span className="md:text-6xl text-4xl font-extrabold">
          notes <span className="text-blue-500 ">.</span> io
        </span>
      </div>

      <div className="flex justify-center pb-4">
        <Input
          type="search"
          className="max-w-xl bg-gray-50 z-100"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex  gap-4 pt-4 justify-center flex-wrap">
        {filteredBlogs.map(blog => (
          <TrackCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            cover={blog.cover}
            slug={blog.slug}
          />
        ))}
      </div>
    </div>
  )
}
