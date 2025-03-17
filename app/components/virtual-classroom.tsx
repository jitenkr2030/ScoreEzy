"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from "next-auth/react"

interface Message {
  id: number
  user: string
  content: string
  timestamp: Date
}

interface DrawingData {
  x: number
  y: number
}

interface Participant {
  id: string
  name: string
}

interface BreakoutRoom {
  id: string
  name: string
}

export function VirtualClassroom() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawingData, setDrawingData] = useState<DrawingData[]>([])
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [breakoutRooms, setBreakoutRooms] = useState<BreakoutRoom[]>([])
  const [currentRoom, setCurrentRoom] = useState<string | null>(null)
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    if (session?.user?.email) {
      socketRef.current = new WebSocket(`${window.location.origin.replace(/^http/, 'ws')}/api/notifications/ws?userId=${session.user.id}`)
      
      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data)
        switch(data.type) {
          case 'chat':
            setMessages(prev => [...prev, data.message])
            break
          case 'drawing':
            updateCanvas(data.drawingData)
            break
          case 'participants':
            setParticipants(data.participants)
            break
          case 'breakoutRooms':
            setBreakoutRooms(data.rooms)
            break
        }
      }

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      return () => {
        if (socketRef.current) {
          socketRef.current.close()
        }
      }
    }
  }, [session])

  const sendMessage = () => {
    if (newMessage.trim() && session?.user?.id && socketRef.current) {
      const messageData = {
        type: 'chat',
        message: {
          id: Date.now(),
          user: session.user.name,
          content: newMessage,
          timestamp: new Date()
        }
      }
      socketRef.current.send(JSON.stringify(messageData))
      setNewMessage("")
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    setIsDrawing(true)
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctx.stroke()
    
    if (socketRef.current) {
      const drawingData = {
        type: 'drawing',
        data: {
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY
        }
      }
      socketRef.current.send(JSON.stringify(drawingData))
    }
  }

  const updateCanvas = (data: { x: number; y: number }) => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    ctx.lineTo(data.x, data.y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
        // Handle screen sharing stream
        setIsScreenSharing(true)
      } else {
        // Stop screen sharing
        setIsScreenSharing(false)
      }
    } catch (error) {
      console.error('Error sharing screen:', error)
    }
  }

  const joinBreakoutRoom = (roomId: string) => {
    setCurrentRoom(roomId)
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({
        type: 'joinRoom',
        roomId
      }))
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Virtual Classroom</CardTitle>
        <CardDescription>Interact with your classmates and instructor in real-time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="video">
          <TabsList>
            <TabsTrigger value="video">Video Stream</TabsTrigger>
            <TabsTrigger value="whiteboard">Whiteboard</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="video">
            <div className="space-y-4">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
                <div className="grid grid-cols-2 gap-2 p-2">
                  {participants.map(participant => (
                    <div key={participant.id} className="relative">
                      <video
                        className="w-full rounded"
                        autoPlay
                        muted={participant.id === session?.user?.id}
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                        {participant.name}
                      </div>
                    </div>
                  ))}
                </div>
                {isScreenSharing && (
                  <div className="absolute inset-0 bg-black">
                    <video className="w-full h-full" autoPlay />
                  </div>
                )}
              </div>
              <div className="flex justify-center space-x-2">
                <Button onClick={toggleScreenShare}>
                  {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                </Button>
                <Button variant="outline">Toggle Camera</Button>
                <Button variant="outline">Toggle Mic</Button>
              </div>
              {breakoutRooms.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Breakout Rooms</h3>
                  <div className="flex space-x-2">
                    {breakoutRooms.map(room => (
                      <Button
                        key={room.id}
                        variant={currentRoom === room.id ? 'default' : 'outline'}
                        onClick={() => joinBreakoutRoom(room.id)}
                      >
                        {room.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="whiteboard">
            <div className="aspect-video bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
              />
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              <Button variant="outline">Clear Board</Button>
              <Button variant="outline">Change Color</Button>
              <Button variant="outline">Download</Button>
            </div>
          </TabsContent>
          <TabsContent value="chat">
            <div className="h-[400px] overflow-y-auto border rounded-md p-4 mb-4">
              {messages.map((msg) => (
                <div key={msg.id} className="mb-2">
                  <span className="font-bold">{msg.user}: </span>
                  <span>{msg.content}</span>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

