import { getBlogBySlug } from "../../../lib/get-blogbyslug"
import { NotionBlockRenderer } from "@/components/notionRenderer"


export default async function BlogDetail({params}:{params:Promise<{trackid:string[]}>}) {
  const param=(await params).trackid[0]
  const blog = await getBlogBySlug(param)
async function generateMetadata(param:string) {
  return {
    title: `${param.toUpperCase()}`, 
    description: `Complete ${param} roadmap provided by Techwingsys.`,
  }
}
  if (!blog) return <div className="flex justify-center items-center">Not found</div>

  return (
    <article className="prose mx-auto py-10 md:w-1/2 w-3/4 ">
      <NotionBlockRenderer blocks={blog.body} />
    </article>
  )
}
