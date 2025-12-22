import { Codecomponent } from "./code-component"

export function NotionBlockRenderer({ blocks }: { blocks: any[] }) {
  const renderRichText = (richTextArr: any[]) => {
  return richTextArr.map((text, index) => {
    const { annotations, plain_text, href } = text;
    const cleanText = plain_text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    const style = `
      ${annotations.bold ? "font-bold text-gray-700 " : ""}
      ${annotations.italic ? "italic" : ""}
      ${annotations.strikethrough ? "line-through" : ""}
      ${annotations.underline ? "underline" : ""}
      ${annotations.code ? "text-black px-1.5 py-0.5 font-semibold  " : ""}
    `;

    if (href) {
      return (
        <a key={index} href={href} target="_blank" className="text-blue-600 hover:underline">
          {cleanText}
        </a>
      );
    }

    return <span key={index} className={style}>{cleanText}</span>;
  });
};
  return (
    <div className="prose prose-invert max-w-none space-y-4">
      {blocks.map((block) => {
        const { type, id } = block;

        switch (type) {
          case "heading_1":
            return <h1 key={id} className="text-4xl font-bold mt-8 mb-4">{renderRichText(block.heading_1.rich_text)}</h1>;
          case "divider":
            return <div key={id}></div>
          
          case "heading_2":
            return <h2 key={id} className="text-2xl font-semibold mt-6 mb-3">{renderRichText(block.heading_2.rich_text)}</h2>;

          case "heading_3":
            return <h3 key={id} className="text-xl font-medium mt-4 mb-2">{renderRichText(block.heading_3.rich_text)}</h3>;

          case "paragraph":
            return <p key={id} className="leading-7 text-black">{renderRichText(block.paragraph.rich_text)}</p>;

          case "bulleted_list_item":
            return (
              <ul key={id} className="list-disc pl-6 space-y-1">
                <li>{renderRichText(block.bulleted_list_item.rich_text)}</li>
              </ul>
            );

          case "numbered_list_item":
            return (
              <ol key={id} className="list-disc pl-6 space-y-1">
                <li>{renderRichText(block.numbered_list_item.rich_text)}</li>
              </ol>
            );

          case "code":
            const codeContent = block.code.rich_text.map((t: any) => t.plain_text).join("");
            return <Codecomponent key={id} code={codeContent} language={block.code.language} id={id} />;

          case "image":
            const url = block.image.type === "external" ? block.image.external.url : block.image.file.url;
            return <img key={id} src={url} alt="Notion Image" className="rounded-lg border border-gray-700 my-6" />;

          case "table":
            return (
              <div key={id} className="my-6 overflow-x-auto border border-black">
                <table className="w-full text-left border-collapse bg-slate-800">
                  <tbody className="divide-y divide-white">
                    {block.children?.map((row: any) => (
                      <tr key={row.id} className="divide-x divide-white">
                        {row.table_row?.cells.map((cell: any, index: number) => (
                          <td key={index} className="p-3 text-sm text-white bg-gray-900/30">
                            {renderRichText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}