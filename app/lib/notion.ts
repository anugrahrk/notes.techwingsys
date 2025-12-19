"use server"
export async function notionRef() {

    const dataSourceId = process.env.NOTION_DATA_SOURCE_ID!

    const res = await fetch(
      `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          "Content-Type": "application/json",
          "Notion-Version": "2025-09-03",
        },
        body: JSON.stringify({
          filter: {
            property: "Published",
            checkbox: { equals: true },
          },
          sorts: [
            {
              timestamp: "created_time",
              direction: "descending",
            },
          ],
        }),
      }
    )
    if(!res.ok){
        throw new Error("Failed to fetch blogs")
    }
    const data = await res.json()

    const blogs = data.results.map((page: any) => ({
      id: page.id,
      title: page.properties.Title?.title?.[0]?.plain_text ?? "",
      slug: page.properties.Slug?.rich_text?.[0]?.plain_text ?? "",
      description: page.properties.Description?.rich_text?.[0]?.plain_text ?? "",
    }))

    return blogs
  
}
