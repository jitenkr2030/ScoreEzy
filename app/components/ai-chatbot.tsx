"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AIChatbot() {
  const [messages, setMessages] = useState([{ id: 1, sender: "bot", content: "Hello! How can I assist you today?" }])
  const [input, setInput] = useState("")

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "user", content: input }])
      // Simulate bot response (in a real app, this would call an AI service)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            sender: "bot",
            content: "I understand your question. Let me find the answer for you.",
          },
        ])
      }, 1000)
      setInput("")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>AI Support Chatbot</CardTitle>
        <CardDescription>Get instant help with your queries</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-2 rounded-md ${
                msg.sender === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
              } max-w-[80%]`}
            >
              {msg.content}
            </div>
          ))}
        </ScrollArea>
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  )
}

