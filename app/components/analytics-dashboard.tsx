"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AnalyticsService } from "@/app/services/analytics-service"
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PerformanceData {
  date: string
  score: number
  attendance: number
}

interface CompletionData {
  course: string
  completed: number
  total: number
  rate: number
}

export function AnalyticsDashboard() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [completionData, setCompletionData] = useState<CompletionData[]>([])
  const [overallProgress, setOverallProgress] = useState(0)
  const [attendanceRate, setAttendanceRate] = useState(0)

  useEffect(() => {
    const analyticsService = new AnalyticsService()
    
    // Fetch mock data for demonstration
    const mockPerformanceData: PerformanceData[] = [
      { date: "2024-01", score: 85, attendance: 90 },
      { date: "2024-02", score: 88, attendance: 95 },
      { date: "2024-03", score: 92, attendance: 88 },
    ]

    const mockCompletionData: CompletionData[] = [
      { course: "Mathematics", completed: 18, total: 20, rate: 90 },
      { course: "Physics", completed: 15, total: 20, rate: 75 },
      { course: "Chemistry", completed: 12, total: 15, rate: 80 },
    ]

    setPerformanceData(mockPerformanceData)
    setCompletionData(mockCompletionData)
    setOverallProgress(85)
    setAttendanceRate(91)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={overallProgress} />
              <p className="text-sm text-gray-500 text-right">{overallProgress}% Complete</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={attendanceRate} />
              <p className="text-sm text-gray-500 text-right">{attendanceRate}% Present</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" name="Score" />
                <Line type="monotone" dataKey="attendance" stroke="#10b981" name="Attendance" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Completion Rates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="rate" fill="#3b82f6" name="Completion Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}