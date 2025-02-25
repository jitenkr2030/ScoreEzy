"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LearningGoals() {
  const [goals, setGoals] = useState([
    { id: 1, description: "Improve Math grade to A", progress: 70 },
    { id: 2, description: "Complete Science fair project", progress: 40 },
    { id: 3, description: "Read 5 books this month", progress: 60 },
  ])

  const studySchedule = [
    { day: "Monday", subjects: ["Math", "Science"] },
    { day: "Tuesday", subjects: ["English", "History"] },
    { day: "Wednesday", subjects: ["Math", "Science"] },
    { day: "Thursday", subjects: ["English", "Art"] },
    { day: "Friday", subjects: ["Math", "Physical Education"] },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Learning Goals</CardTitle>
          <CardDescription>Set and track specific learning objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {goals.map((goal) => (
              <li key={goal.id} className="space-y-2">
                <div className="flex justify-between">
                  <span>{goal.description}</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} />
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            <Input placeholder="New goal description" />
            <Button>Add Goal</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Study Schedule Review</CardTitle>
          <CardDescription>Review and optimize your child's study time</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {studySchedule.map((day) => (
              <li key={day.day} className="flex justify-between">
                <span className="font-semibold">{day.day}</span>
                <span>{day.subjects.join(", ")}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Label htmlFor="subject-focus">Suggest subject focus</Label>
            <Select>
              <SelectTrigger id="subject-focus">
                <SelectValue placeholder="Choose a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Math</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
            <Button className="mt-2">Get Study Tips</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

