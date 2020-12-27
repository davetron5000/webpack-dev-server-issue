import "tachyons"
import "../css/styles.css"
import "../html/index.html"
import renderMarkdown from "./renderMarkdown.js"


document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("editor").addEventListener(
    "submit",
    (event) => {
      event.preventDefault()
      const textArea       = document.getElementById("source"),
            previewElement = document.getElementById("preview")

/* XXX       try { */
/* XXX         renderMarkdown(textArea,previewElement) */
/* XXX       } catch (error) { */
/* XXX         mapStackTrace(error.stack, (mappedStack) => { */
/* XXX            const stack = mappedStack.join("\n") */
/* XXX            previewElement.innerHTML = `<pre>${stack}</pre>` */
/* XXX         }) */
/* XXX       } */
/* START:edit:12 */
      renderMarkdown(textArea,previewElement)
/* END:edit:3 */
    }
  )
})
