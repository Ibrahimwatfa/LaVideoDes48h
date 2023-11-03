import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface RichTextProps {
  data: {
    content: string
  }
}

export default function RichText({ data }: RichTextProps) {
  // TODO: STYLE THE MARKDOWN
  return (
    <section className="container rich-text p-6 mx-auto ">
      <Markdown children={data.content} remarkPlugins={[remarkGfm]} />
    </section>
  )
}
