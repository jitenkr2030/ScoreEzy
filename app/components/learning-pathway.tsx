"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function LearningPathway() {
  const [modules, setModules] = useState([
    { id: 1, name: "Introduction to Programming", progress: 100, completed: true },
    { id: 2, name: "Data Structures", progress: 60, completed: false },
    { id: 3, name: "Algorithms", progress: 0, completed: false },
    { id: 4, name: "Web Development Basics", progress: 0, completed: false },
  ])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Your Learning Pathway</CardTitle>
        <CardDescription>Customize your learning journey</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {modules.map((module) => (
            <li key={module.id} className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{module.name}</h3>
                <Button variant={module.completed ? "secondary" : "outline"} size="sm">
                  {module.completed ? "Completed" : "Start"}
                </Button>
              </div>
              <Progress value={module.progress} className="h-2" />
            </li>
          ))}
        </ul>
        <Button className="mt-4">Customize Pathway</Button>
      </CardContent>
    </Card>
  )
}

