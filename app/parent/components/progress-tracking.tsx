"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function ProgressTracking() {
  const grades = [
    { subject: "Math", grade: "A", score: 92 },
    { subject: "Science", grade: "B+", score: 87 },
    { subject: "English", grade: "A-", score: 90 },
    { subject: "History", grade: "B", score: 85 },
  ]

  const emotionalInsights = [
    { week: "Week 1", engagement: 80, motivation: 75, stress: 30 },
    { week: "Week 2", engagement: 85, motivation: 80, stress: 25 },
    { week: "Week 3", engagement: 75, motivation: 70, stress: 40 },
    { week: "Week 4", engagement: 90, motivation: 85, stress: 20 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detailed Report Card</CardTitle>
          <CardDescription>Your child's grades and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {grades.map((subject) => (
              <li key={subject.subject} className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{subject.subject}</h4>
                  <p className="text-sm text-gray-500">Grade: {subject.grade}</p>
                </div>
                <Progress value={subject.score} className="w-1/3" />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Behavioral & Emotional Insights</CardTitle>
          <CardDescription>Track your child's emotional well-being</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={emotionalInsights}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="engagement" fill="#8884d8" name="Engagement" />
              <Bar dataKey="motivation" fill="#82ca9d" name="Motivation" />
              <Bar dataKey="stress" fill="#ffc658" name="Stress" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

