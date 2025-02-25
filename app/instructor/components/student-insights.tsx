"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { AnalyticsService } from "@/app/services/analytics-service"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StudentInsights() {
  const [selectedStudent, setSelectedStudent] = useState<string>()
  const [performanceData, setPerformanceData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const analyticsService = new AnalyticsService()

  useEffect(() => {
    if (selectedStudent) {
      loadStudentPerformance(selectedStudent)
    }
  }, [selectedStudent])

  const loadStudentPerformance = async (studentId: string) => {
    setLoading(true)
    try {
      const data = await analyticsService.getStudentPerformanceInsights(studentId)
      setPerformanceData(data)
    } catch (error) {
      console.error("Error loading student performance:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Performance Analytics</CardTitle>
          <CardDescription>Comprehensive view of student progress and engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {/* Add your student list here */}
                <SelectItem value="student1">Alice Johnson</SelectItem>
                <SelectItem value="student2">Bob Smith</SelectItem>
              </SelectContent>
            </Select>

            {loading ? (
              <div>Loading...</div>
            ) : (
              performanceData.map((course, index) => (
                <Card key={index} className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{course.courseName}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Course Progress</p>
                      <Progress value={course.progress} className="mt-2" />
                      <p className="text-sm mt-1">{course.progress}% Complete</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Grade Distribution</p>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={course.grades.map((grade: number, i: number) => ({ name: `Assignment ${i + 1}`, grade }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Line type="monotone" dataKey="grade" stroke="#8884d8" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Attendance Rate</p>
                        <p className="text-2xl font-semibold">{course.attendance}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Participation Rate</p>
                        <p className="text-2xl font-semibold">{course.participation}%</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Last Active</p>
                      <p className="text-sm">{new Date(course.lastActive).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

