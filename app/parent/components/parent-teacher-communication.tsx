"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ParentTeacherCommunication() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "Mrs. Smith",
      subject: "Math Progress Update",
      preview: "Your child has shown significant improvement...",
    },
    {
      id: 2,
      from: "Mr. Johnson",
      subject: "Science Project Feedback",
      preview: "Regarding the recent science fair project...",
    },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>PTM Booking System</CardTitle>
          <CardDescription>Schedule meetings with your child's instructors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="instructor">Select Instructor</Label>
              <Select>
                <SelectTrigger id="instructor">
                  <SelectValue placeholder="Choose an instructor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smith">Mrs. Smith (Math)</SelectItem>
                  <SelectItem value="johnson">Mr. Johnson (Science)</SelectItem>
                  <SelectItem value="williams">Ms. Williams (English)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label>Select Date</Label>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </div>
          </div>
          <Button className="mt-4">Book Meeting</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Direct Messaging</CardTitle>
          <CardDescription>Communicate with instructors and administrators</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message.id} className="border p-4 rounded-md">
                <h4 className="font-semibold">{message.subject}</h4>
                <p className="text-sm text-gray-500">From: {message.from}</p>
                <p className="mt-2">{message.preview}</p>
                <Button variant="link" className="p-0">
                  Read More
                </Button>
              </li>
            ))}
          </ul>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">New Message</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send New Message</DialogTitle>
                <DialogDescription>Compose a message to an instructor or administrator</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recipient">Recipient</Label>
                  <Select>
                    <SelectTrigger id="recipient">
                      <SelectValue placeholder="Choose a recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smith">Mrs. Smith (Math)</SelectItem>
                      <SelectItem value="johnson">Mr. Johnson (Science)</SelectItem>
                      <SelectItem value="williams">Ms. Williams (English)</SelectItem>
                      <SelectItem value="admin">School Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter message subject" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here" />
                </div>
                <Button>Send Message</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}

