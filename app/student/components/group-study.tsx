"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function GroupStudy() {
  const [groups, setGroups] = useState([
    { id: 1, name: "JavaScript Study Group", members: 5, activeUsers: 3, nextSession: "2024-03-01T15:00:00Z" },
    { id: 2, name: "Machine Learning Enthusiasts", members: 8, activeUsers: 5, nextSession: "2024-03-02T14:00:00Z" },
    { id: 3, name: "Web Development Team", members: 6, activeUsers: 4, nextSession: "2024-03-03T16:00:00Z" },
  ])

  const [newGroupName, setNewGroupName] = useState("")
  const [activeDiscussions, setActiveDiscussions] = useState([
    { id: 1, topic: "React Hooks Best Practices", participants: 12, messages: 45 },
    { id: 2, topic: "Python Data Visualization", participants: 8, messages: 23 },
  ])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setGroups(groups => groups.map(group => ({
        ...group,
        activeUsers: Math.floor(Math.random() * group.members) + 1
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const createGroup = () => {
    if (newGroupName) {
      setGroups([...groups, { 
        id: Date.now(), 
        name: newGroupName, 
        members: 1,
        activeUsers: 1,
        nextSession: new Date().toISOString()
      }])
      setNewGroupName("")
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Study Groups</CardTitle>
          <CardDescription>Join or create study groups with your peers</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 mb-4">
            {groups.map((group) => (
              <li key={group.id} className="flex items-center justify-between">
                <span>
                  {group.name} ({group.members} members)
                </span>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </li>
            ))}
          </ul>
          <div className="flex space-x-2">
            <Input
              placeholder="New group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />
            <Button onClick={createGroup}>Create Group</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Discussion Forums</CardTitle>
          <CardDescription>Participate in subject-specific discussions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h4 className="font-semibold">JavaScript: Async/Await vs Promises</h4>
              <p className="text-sm text-gray-500">23 replies • Last post 2 hours ago</p>
              <Button variant="link" className="p-0">
                View Thread
              </Button>
            </div>
            <div className="border p-4 rounded-md">
              <h4 className="font-semibold">Python: Best Practices for Data Science</h4>
              <p className="text-sm text-gray-500">15 replies • Last post 5 hours ago</p>
              <Button variant="link" className="p-0">
                View Thread
              </Button>
            </div>
            <div className="space-y-2">
              <Input placeholder="New discussion topic" />
              <Textarea placeholder="Description of your topic" />
              <Button>Start New Discussion</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

