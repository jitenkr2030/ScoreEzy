"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export function CollaborationTools() {
  const [groupProjects, setGroupProjects] = useState([
    { id: 1, name: "Web Development Project", members: 4, progress: 60 },
    { id: 2, name: "Machine Learning Research", members: 3, progress: 40 },
  ])

  const [peerReviews, setPeerReviews] = useState([
    { id: 1, assignment: "JavaScript Essay", reviewers: 3, completed: 2 },
    { id: 2, assignment: "Python Code Review", reviewers: 4, completed: 4 },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Group Assignments</CardTitle>
          <CardDescription>Manage and track group projects</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {groupProjects.map((project) => (
              <li key={project.id} className="border p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{project.name}</h4>
                    <p className="text-sm text-gray-500">{project.members} members</p>
                  </div>
                  <Progress value={project.progress} className="w-1/4" />
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  View Details
                </Button>
              </li>
            ))}
          </ul>
          <Button className="mt-4">Create New Group Project</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Peer Review System</CardTitle>
          <CardDescription>Set up and manage peer-to-peer assignments</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {peerReviews.map((review) => (
              <li key={review.id} className="border p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{review.assignment}</h4>
                    <p className="text-sm text-gray-500">
                      {review.completed} of {review.reviewers} reviews completed
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Reviews
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <Button className="mt-4">Create New Peer Review Assignment</Button>
        </CardContent>
      </Card>
    </div>
  )
}

