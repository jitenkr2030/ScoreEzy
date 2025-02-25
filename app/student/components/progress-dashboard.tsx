"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function ProgressDashboard() {
  const courseProgress = [
    { name: "Machine Learning", progress: 75 },
    { name: "Web Development", progress: 90 },
    { name: "Data Structures", progress: 60 },
    { name: "Algorithms", progress: 80 },
  ]

  const performanceData = [
    { subject: "Quiz 1", score: 85 },
    { subject: "Quiz 2", score: 90 },
    { subject: "Midterm", score: 78 },
    { subject: "Project", score: 92 },
    { subject: "Final Exam", score: 88 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
          <CardDescription>Track your progress in each course</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {courseProgress.map((course) => (
              <li key={course.name} className="space-y-1">
                <div className="flex justify-between">
                  <span>{course.name}</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Your performance in recent assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instructor Feedback</CardTitle>
          <CardDescription>Recent feedback from your instructors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h4 className="font-semibold">Web Development Project</h4>
              <p className="mt-2">
                Great work on implementing responsive design. Consider improving your JavaScript code organization for
                better maintainability.
              </p>
            </div>
            <div className="border p-4 rounded-md">
              <h4 className="font-semibold">Machine Learning Assignment</h4>
              <p className="mt-2">
                Excellent analysis of the dataset. Next time, try to provide more insights into the model's performance
                metrics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

