const handler = require("serve-handler")
const http    = require("http")
const process = require("process")
const fs      = require("fs")

// argv[0] is node
// argv[1] is the name of this script
// argv[2] is the directory to serve files from
const directory = process.argv[2]

fs.mkdirSync("tmp/pids", { recursive: true })
fs.writeFileSync("tmp/pids/server.pid",process.pid)

const server = http.createServer((request, response) => {
  return handler(
    request,
    response,
    {
      public: directory
    }
  )
})

server.listen(3000, () => {
  console.log("Running at http://localhost:3000")
})
