const path = require("path")
const glob = require("glob")

const testFiles = glob.sync("tests/js/**/*.test.js").
  map( (fileName) => {
    return `./${fileName}`
  })


module.exports = {
/* START:edit:3 */
  entry: testFiles,
/* END:edit:3 */
  output: {
    path: path.resolve(__dirname, "..", "test"),
    filename: "bundle.test.js"
  },
  mode: "none"
}
