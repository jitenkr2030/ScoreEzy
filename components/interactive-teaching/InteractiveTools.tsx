"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSession } from "next-auth/react"

interface PollData {
  question: string;
  options: string[];
  results: Record<number, number>;
}

interface BreakoutRoom {
  id: number;
  name: string;
  participants: string[];
}

export function InteractiveTools() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("whiteboard")
  const [isDrawing, setIsDrawing] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [poll, setPoll] = useState<PollData>({ question: "", options: ["", ""], results: {} })
  const [breakoutRooms, setBreakoutRooms] = useState<BreakoutRoom[]>([])
  const [currentRoom, setCurrentRoom] = useState<number | null>(null)
  
  const wsRef = useRef<WebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const screenShareRef = useRef<HTMLVideoElement | null>(null);
  
  useEffect(() => {
    if (session?.user?.email && typeof window !== 'undefined') {
      const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000';
      try {
        const ws = new window.WebSocket(wsUrl);
        wsRef.current = ws;
  
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          switch(data.type) {
            case 'drawing':
              updateCanvas(data.drawingData);
              break;
            case 'poll':
              setPoll(data.pollData);
              break;
            case 'breakoutRooms':
              setBreakoutRooms(data.rooms);
              break;
          }
        };
  
        return () => ws.close();
      } catch (error) {
        console.error('WebSocket connection error:', error);
      }
    }
  }, [session]);
  
  // Whiteboard functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
      
      wsRef.current?.send(JSON.stringify({
        type: 'drawing',
        drawingData: {
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY
        }
      }));
    }
  };
  
  const updateCanvas = (data: { x: number; y: number }) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(data.x, data.y);
      ctx.stroke();
    }
  };
  
  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.closePath();
    }
  };

  // Screen sharing functions
  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing && screenShareRef.current) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenShareRef.current.srcObject = stream;
        setIsScreenSharing(true);
      } else if (screenShareRef.current && screenShareRef.current.srcObject instanceof MediaStream) {
        const tracks = screenShareRef.current.srcObject.getTracks();
        tracks.forEach((track: MediaStreamTrack) => track.stop());
        screenShareRef.current.srcObject = null;
        setIsScreenSharing(false);
      }
    } catch (error) {
      console.error('Screen sharing error:', error);
    }
  };

  // Live polling functions
  const createPoll = () => {
    wsRef.current?.send(JSON.stringify({
      type: 'poll',
      pollData: poll
    }))
  }

  const votePoll = (optionIndex: number) => {
    const newResults = { ...poll.results }
    newResults[optionIndex] = (newResults[optionIndex] || 0) + 1
    setPoll({ ...poll, results: newResults })
    
    wsRef.current?.send(JSON.stringify({
      type: 'poll',
      pollData: { ...poll, results: newResults }
    }))
  }

  // Breakout rooms functions
  const createBreakoutRoom = () => {
    const newRoom: BreakoutRoom = {
      id: Date.now(),
      name: `Room ${breakoutRooms.length + 1}`,
      participants: []
    }
    setBreakoutRooms([...breakoutRooms, newRoom])
    
    wsRef.current?.send(JSON.stringify({
      type: 'breakoutRooms',
      rooms: [...breakoutRooms, newRoom]
    }))
  }

  const joinRoom = (roomId: number) => {
    setCurrentRoom(roomId)
    wsRef.current?.send(JSON.stringify({
      type: 'joinRoom',
      roomId,
      userId: session?.user?.id
    }))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Interactive Teaching Tools</CardTitle>
        <CardDescription>Engage with students using various interactive features</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="whiteboard">Virtual Whiteboard</TabsTrigger>
            <TabsTrigger value="screenshare">Screen Sharing</TabsTrigger>
            <TabsTrigger value="polling">Live Polling</TabsTrigger>
            <TabsTrigger value="breakout">Breakout Rooms</TabsTrigger>
          </TabsList>

          <TabsContent value="whiteboard" className="mt-4">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border border-gray-200 rounded-lg"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
            />
          </TabsContent>

          <TabsContent value="screenshare" className="mt-4">
            <div className="space-y-4">
              <Button onClick={toggleScreenShare}>
                {isScreenSharing ? 'Stop Sharing' : 'Start Screen Share'}
              </Button>
              <video
                ref={screenShareRef}
                autoPlay
                className="w-full aspect-video bg-gray-100 rounded-lg"
              />
            </div>
          </TabsContent>

          <TabsContent value="polling" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Poll Question</Label>
                <Input
                  value={poll.question}
                  onChange={(e) => setPoll({ ...poll, question: e.target.value })}
                  placeholder="Enter your question"
                />
              </div>
              {poll.options.map((option, index) => (
                <div key={index} className="space-y-2">
                  <Label>Option {index + 1}</Label>
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...poll.options]
                      newOptions[index] = e.target.value
                      setPoll({ ...poll, options: newOptions })
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
              <Button onClick={createPoll}>Create Poll</Button>

              {Object.entries(poll.results).length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium">Results:</h3>
                  {Object.entries(poll.results).map(([optionIndex, votes]) => (
                    <div key={optionIndex} className="flex justify-between">
                      <span>{poll.options[Number(optionIndex)]}</span>
                      <span>{votes} votes</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="breakout" className="mt-4">
            <div className="space-y-4">
              <Button onClick={createBreakoutRoom}>Create Breakout Room</Button>
              <div className="grid grid-cols-2 gap-4">
                {breakoutRooms.map((room) => (
                  <Card key={room.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <CardDescription>
                        {room.participants.length} participants
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => joinRoom(room.id)}
                        variant={currentRoom === room.id ? "secondary" : "default"}
                      >
                        {currentRoom === room.id ? 'Leave Room' : 'Join Room'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}