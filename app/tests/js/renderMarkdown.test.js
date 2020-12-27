import renderMarkdown from "../../js/renderMarkdown.js"

describe("renderMarkdown", () => {
/* START:edit:3 */
  it("renders markdown", () => {
    const textArea = {
      value: "This is *some* Markdown:\n* and a\n* bullet list\n"
    }
    const previewElement = {}

    renderMarkdown(textArea,previewElement)

    expect(previewElement.innerHTML).toBe(
`<p>This is <em>some</em> Markdown:</p>
<ul>
<li>and a</li>
<li>bullet list</li>
</ul>
`)
  })
/* END:edit:3 */
  it("can be imported", () => {
    expect(renderMarkdown).toBeDefined();
  });
});
