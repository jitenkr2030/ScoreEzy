"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function InstructorDashboard() {
  const courses = [
    { id: 1, name: "Introduction to React", students: 50, rating: 4.5 },
    { id: 2, name: "Advanced JavaScript", students: 30, rating: 4.8 },
    { id: 3, name: "Data Structures and Algorithms", students: 40, rating: 4.2 },
  ]

  const upcomingClasses = [
    { id: 1, name: "React Hooks Deep Dive", date: "2023-07-15", time: "10:00 AM" },
    { id: 2, name: "JavaScript Patterns", date: "2023-07-20", time: "2:00 PM" },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Instructor Dashboard</h2>
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="schedule">Class Schedule</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
                <CardDescription>{course.students} students enrolled</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Rating: {course.rating}/5</p>
                <Button className="mt-4">Manage Course</Button>
              </CardContent>
            </Card>
          ))}
          <Button>Create New Course</Button>
        </TabsContent>
        <TabsContent value="schedule" className="space-y-4">
          {upcomingClasses.map((class_) => (
            <Card key={class_.id}>
              <CardHeader>
                <CardTitle>{class_.name}</CardTitle>
                <CardDescription>
                  Date: {class_.date} at {class_.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button>Start Class</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Instructor Performance</CardTitle>
              <CardDescription>Your teaching stats and earnings</CardDescription>
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

