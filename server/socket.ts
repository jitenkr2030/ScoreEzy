import { createServer } from "http"
import { parse } from "url"
import next from "next"
import { Server } from "socket.io"
import { interceptClientRequest } from "@mswjs/interceptors/lib/interceptors/ClientRequest"

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(server)

  // Setup interceptor
  interceptClientRequest((request) => {
    // Your interception logic here
    console.log("Intercepted request:", request.url)
  })

  io.on("connection", (socket) => {
    console.log("A user connected")

    socket.on("join-room", (roomId) => {
      socket.join(roomId)
      console.log(`User joined room ${roomId}`)
    })

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId)
      console.log(`User left room ${roomId}`)
    })

    socket.on("send-message", (message, roomId) => {
      io.to(roomId).emit("receive-message", message)
    })

    socket.on("disconnect", () => {
      console.log("A user disconnected")
    })
  })

  server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
  })
})

