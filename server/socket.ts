import { createServer } from "http"
import { parse } from "url"
import next from "next"
import { WebSocketServer } from 'ws'
import { NotificationService } from '@/app/services/notification-service'

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    if (req.headers.upgrade?.toLowerCase() === 'websocket') {
      // Let the WebSocket server handle the upgrade
      return;
    }
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  const wss = new WebSocketServer({ server })

  wss.on('connection', (ws, req) => {
    console.log("A user connected")
    const userId = req.headers['x-user-id'];
    
    if (userId) {
      const notificationService = NotificationService.getInstance();
      notificationService.addConnection(userId.toString(), ws);
    }

    ws.on("ping", () => {
      ws.send(JSON.stringify({ type: 'pong' }));
    });

    ws.on("close", () => {
      if (userId) {
        console.log(`User ${userId} disconnected`);
      }
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  })

  server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
  })
})

