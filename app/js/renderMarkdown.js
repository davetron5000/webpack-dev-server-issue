import MarkdownIt from "markdown-it"

const markdown = new MarkdownIt()

const renderMarkdown = (textArea, previewElement) => {
  const text = textArea.value
/* START:edit:3 */
  throw new Error("OH NOES!")
/* END:edit:3 */
  previewElement.innerHTML = markdown.render(text)
}

export default renderMarkdown
