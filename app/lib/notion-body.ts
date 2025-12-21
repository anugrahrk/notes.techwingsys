"use server"


export async function getBlogBody(pageId: string) {
  let blocks: any[] = []
  let cursor: string | undefined = undefined

  while (true) {
    const res:any = await fetch(
      `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100${
        cursor ? `&start_cursor=${cursor}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2025-09-03",
        },
        cache: "no-store",
      }
    )

    if (!res.ok) {
      throw new Error("Failed to fetch page body")
    }

    const data = await res.json()
    blocks.push(...data.results)

    if (!data.has_more) break
    cursor = data.next_cursor
  }

  return blocks
}
