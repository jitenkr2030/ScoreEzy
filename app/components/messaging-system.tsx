"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"

type Message = {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: Date
  isRead: boolean
  sender: {
    name: string
    email: string
  }
}

export function MessagingSystem() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [contacts, setContacts] = useState<Array<{ id: string; name: string; email: string }>>([])

  useEffect(() => {
    if (session?.user?.email) {
      // Fetch user's contacts
      fetchContacts()
      // Connect to WebSocket
      const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000')
      
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if (message.receiverId === session.user.id) {
          setMessages(prev => [...prev, message])
        }
      }

      return () => socket.close()
    }
  }, [session])

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser)
    }
  }, [selectedUser])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/users/contacts')
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const fetchMessages = async (userId: string) => {
    try {
      const response = await fetch(`/api/messages/${userId}`)
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedUser || !session?.user?.id) return

    try {
      const response = await fetch('/api/messages/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newMessage,
          receiverId: selectedUser,
          senderId: session.user.id
        })
      })

      const message = await response.json()
      setMessages(prev => [...prev, message])
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>Chat with your instructors and classmates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-4 h-[600px]">
          <div className="col-span-4 border-r pr-4">
            <ScrollArea className="h-full">
              {contacts.map(contact => (
                <div
                  key={contact.id}
                  className={`flex items-center space-x-4 p-3 cursor-pointer hover:bg-gray-100 rounded-lg ${selectedUser === contact.id ? 'bg-gray-100' : ''}`}
                  onClick={() => setSelectedUser(contact.id)}
                >
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${contact.email}`} />
                    <AvatarFallback>{contact.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.email}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="col-span-8 flex flex-col">
            <ScrollArea className="flex-1 mb-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`mb-4 ${message.senderId === session?.user?.id ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${message.senderId === session?.user?.id ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}