"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function StudentDashboard() {
  const enrolledCourses = [
    { id: 1, name: "Introduction to React", progress: 75 },
    { id: 2, name: "Advanced JavaScript", progress: 40 },
    { id: 3, name: "Data Structures and Algorithms", progress: 60 },
  ]

  const upcomingExams = [
    { id: 1, name: "React Fundamentals Quiz", date: "2023-07-15" },
    { id: 2, name: "JavaScript Midterm", date: "2023-07-20" },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Student Dashboard</h2>
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="exams">Upcoming Exams</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="space-y-4">
          {enrolledCourses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
                <CardDescription>Course Progress</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={course.progress} className="w-full" />
                <p className="mt-2 text-sm text-gray-500">{course.progress}% Complete</p>
                <Button className="mt-4">Continue Learning</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="exams" className="space-y-4">
          {upcomingExams.map((exam) => (
            <Card key={exam.id}>
              <CardHeader>
                <CardTitle>{exam.name}</CardTitle>
                <CardDescription>Exam Date: {exam.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Prepare for Exam</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Your progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Performance analytics content goes here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

