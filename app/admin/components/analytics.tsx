"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AnalyticsService } from "@/app/services/analytics-service"
import { Calendar } from "@/components/ui/calendar"

export function Analytics() {
  const [reportType, setReportType] = useState("course-completion")
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [reportData, setReportData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const analyticsService = new AnalyticsService()

  const generateCustomReport = async () => {
    setLoading(true)
    try {
      const data = await analyticsService.generateCustomReport({
        type: reportType as "course-completion" | "student-grades" | "instructor-effectiveness",
        startDate,
        endDate
      })
      setReportData(Array.isArray(data) ? data : Object.values(data))
    } catch (error) {
      console.error("Error generating report:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">AI-Powered Analytics Dashboard</h3>
          <p className="text-sm text-muted-foreground">View detailed performance and engagement reports</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue>{reportType}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course-completion">Course Completion</SelectItem>
                    <SelectItem value="student-grades">Student Grades</SelectItem>
                    <SelectItem value="instructor-effectiveness">Instructor Effectiveness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  className="rounded-md border"
                />
              </div>
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  className="rounded-md border"
                />
              </div>
            </div>
            <Button onClick={generateCustomReport} disabled={loading}>
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

