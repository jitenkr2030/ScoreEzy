"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function ContentUpdates() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "New Assignment", enabled: true },
    { id: 2, type: "Exam Schedule", enabled: true },
    { id: 3, type: "Class Updates", enabled: false },
  ])

  const toggleNotification = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, enabled: !notif.enabled } : notif)))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Auto Notifications</CardTitle>
          <CardDescription>Set up automatic notifications for your students</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {notifications.map((notif) => (
              <li key={notif.id} className="flex items-center justify-between">
                <Label htmlFor={`notification-${notif.id}`}>{notif.type}</Label>
                <Switch
                  id={`notification-${notif.id}`}
                  checked={notif.enabled}
                  onCheckedChange={() => toggleNotification(notif.id)}
                />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create New Notification</CardTitle>
          <CardDescription>Set up a custom notification for your students</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="notification-title">Notification Title</Label>
              <Input id="notification-title" placeholder="Enter notification title" />
            </div>
            <div>
              <Label htmlFor="notification-message">Notification Message</Label>
              <Textarea id="notification-message" placeholder="Enter notification message" />
            </div>
            <Button>Send Notification</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

