// components/NotionBlockRenderer.tsx

import { Codecomponent } from "./code-component"

export function NotionBlockRenderer({ blocks }: { blocks: any[] }) {
  return (
    <div className="prose prose-invert">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading_1":
            return <h1 className="font-bold text-4xl pb-4" key={block.id}>{block.heading_1.rich_text[0]?.plain_text}</h1>

          case "heading_3":
            return <h3 className="font-semibold text-xl pb-2" key={block.id}>{block.heading_3.rich_text[0]?.plain_text}</h3>

          case "paragraph":
            return <p key={block.id}>{block.paragraph.rich_text[0]?.plain_text}</p>

          case "code": {
            const codeText = block.code.rich_text[0]?.plain_text ?? ""
            const language = block.code.language || "text"

            return (
              <Codecomponent code={codeText} id={block.id} language={language} key={block.id}/>
            )
          }

          case "image":
            const img =
              block.image.type === "file"
                ? block.image.file.url
                : block.image.external.url
            return <img key={block.id} src={img} alt="" />

          case "bulleted_list_item":
            return <li key={block.id}>{block.bulleted_list_item.rich_text[0]?.plain_text}</li>

          default:
            return null
        }
      })}
    </div>
  )
}
