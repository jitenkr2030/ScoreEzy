"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AIGradingService } from "@/app/services/ai-grading-service"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Assignment {
  id: number
  title: string
  type: string
  status: string
  score: number | null
}

export function TeachingTools() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: "JavaScript Basics Quiz", type: "Multiple Choice", status: "Graded", score: 85 },
    { id: 2, title: "React Project", type: "Project Submission", status: "Pending", score: null },
  ])
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [isGradingDialogOpen, setIsGradingDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [gradingCriteria, setGradingCriteria] = useState({
    name: "",
    weight: 1,
    rubric: []
  })

  const gradingService = React.useMemo(() => new AIGradingService(), [])

  const handleGradeSubmission = async (assignmentId: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await gradingService.gradeSubmission(assignmentId, "submission content")
      setAssignments(assignments.map(assignment =>
        assignment.id.toString() === assignmentId ? { ...assignment, status: "Graded", score: result.score } : assignment
      ))
    } catch (error) {
      console.error('Error grading submission:', error)
      setError('Failed to grade submission')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Live Class Scheduling & Broadcasting</CardTitle>
          <CardDescription>Schedule and manage your live sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="class-title">Class Title</Label>
              <Input id="class-title" placeholder="Enter class title" />
            </div>
            <div className="flex-1">
              <Label htmlFor="class-date">Class Date</Label>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </div>
          </div>
          <Button className="mt-4">Schedule Live Class</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Grading</CardTitle>
          <CardDescription>Automatically grade assignments with AI assistance</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {assignments.map((assignment) => (
              <li key={assignment.id} className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{assignment.title}</h4>
                  <p className="text-sm text-gray-500">{assignment.type}</p>
                  {assignment.score !== null && (
                    <p className="text-sm text-blue-600">Score: {assignment.score}%</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${assignment.status === "Graded" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {assignment.status}
                  </span>
                  {assignment.status === "Pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedAssignment(assignment)
                        setIsGradingDialogOpen(true)
                      }}
                    >
                      Grade
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Dialog open={isGradingDialogOpen} onOpenChange={setIsGradingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Grade Assignment</DialogTitle>
          </DialogHeader>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-4">
            <div>
              <Label>Grading Criteria</Label>
              <Input
                value={gradingCriteria.name}
                onChange={(e) => setGradingCriteria({ ...gradingCriteria, name: e.target.value })}
                placeholder="Enter criteria name"
                disabled={isLoading}
              />
            </div>
            <div>
              <Label>Weight</Label>
              <Input
                type="number"
                value={gradingCriteria.weight}
                onChange={(e) => setGradingCriteria({ ...gradingCriteria, weight: parseFloat(e.target.value) })}
                placeholder="Enter criteria weight"
                disabled={isLoading}
              />
            </div>
            <Button 
              onClick={() => selectedAssignment?.id && handleGradeSubmission(selectedAssignment.id.toString())}
              disabled={isLoading}
            >
              {isLoading ? "Grading..." : "Start AI Grading"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default TeachingTools

