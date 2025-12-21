"use server"

import { notionRef } from "./notion"
import { getBlogBody } from "./notion-body"

export async function getBlogBySlug(slug: string) {
  const { blogs } = await notionRef()
  
  const blog = blogs.find((b:any) => b.slug === slug)
  
  if (!blog) return null

  const body = await getBlogBody(blog.id)

  return {
    ...blog,
    body,
  }
}
