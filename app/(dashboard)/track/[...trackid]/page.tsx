import { getBlogBySlug } from "../../../lib/get-blogbyslug"
import { NotionBlockRenderer } from "@/components/notionRenderer"


export default async function BlogDetail({params}:{params:Promise<{trackid:string[]}>}) {
  const blog = await getBlogBySlug((await params).trackid[0])
  if (!blog) return <div className="flex justify-center items-center">Not found</div>

  return (
    <article className="prose mx-auto py-10 md:w-1/2 w-3/4 ">
      <NotionBlockRenderer blocks={blog.body} />

    </article>
  )
}
