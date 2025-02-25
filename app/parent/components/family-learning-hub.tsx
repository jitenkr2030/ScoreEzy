"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export function FamilyLearningHub() {
  const [familyGoals, setFamilyGoals] = useState([
    { id: 1, description: "Complete family book club (5 books)", progress: 60 },
    { id: 2, description: "Family science project", progress: 30 },
    { id: 3, description: "Learn a new language together", progress: 45 },
  ])

  const [children, setChildren] = useState([
    { id: 1, name: "Emma", grade: "5th", subjects: ["Math", "Science"] },
    { id: 2, name: "Liam", grade: "3rd", subjects: ["Reading", "Art"] },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Collaborative Family Learning</CardTitle>
          <CardDescription>Set and track shared learning goals for your family</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {familyGoals.map((goal) => (
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
            <Input placeholder="New family goal" />
            <Button>Add Family Goal</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Children's Progress</CardTitle>
          <CardDescription>Track the combined progress of your children</CardDescription>
        </CardHeader>
        <CardContent>
          {children.map((child) => (
            <div key={child.id} className="mb-4">
              <h4 className="font-semibold">
                {child.name} - {child.grade} Grade
              </h4>
              <p className="text-sm text-gray-500">Focusing on: {child.subjects.join(", ")}</p>
              <Progress value={Math.random() * 100} className="mt-2" />
            </div>
          ))}
          <Button className="mt-4">View Detailed Progress</Button>
        </CardContent>
      </Card>
    </div>
  )
}

