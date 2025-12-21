// app/page.tsx (or wherever this page lives)
import { notionRef } from "@/app/lib/notion"
import SearchClient from "../../../components/searchclient"

export default async function Page() {
  const { blogs } = await notionRef()

  return <SearchClient blogs={blogs} />
}
