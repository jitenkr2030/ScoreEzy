"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export function CustomAlerts() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "Exam Results", enabled: true },
    { id: 2, type: "Grade Drops", enabled: true },
    { id: 3, type: "Missed Assignments", enabled: false },
  ])

  const [milestones, setMilestones] = useState([
    { id: 1, description: "Finish Math Course", progress: 75 },
    { id: 2, description: "Achieve A grade in Science", progress: 90 },
  ])

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, enabled: !alert.enabled } : alert)))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personalized Alerts</CardTitle>
          <CardDescription>Set up custom notifications for important events</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {alerts.map((alert) => (
              <li key={alert.id} className="flex items-center justify-between">
                <Label htmlFor={`alert-${alert.id}`}>{alert.type}</Label>
                <Switch
                  id={`alert-${alert.id}`}
                  checked={alert.enabled}
                  onCheckedChange={() => toggleAlert(alert.id)}
                />
              </li>
            ))}
          </ul>
          <Button className="mt-4">Add New Alert</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progress Milestones</CardTitle>
          <CardDescription>Track significant learning achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {milestones.map((milestone) => (
              <li key={milestone.id} className="space-y-2">
                <div className="flex justify-between">
                  <span>{milestone.description}</span>
                  <span>{milestone.progress}%</span>
                </div>
                <Progress value={milestone.progress} />
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2">
            <Input placeholder="New milestone description" />
            <Button>Add Milestone</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

