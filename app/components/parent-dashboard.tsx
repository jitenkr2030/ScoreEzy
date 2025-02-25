"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function ParentDashboard() {
  const children = [
    {
      id: 1,
      name: "Emma",
      grade: "8th",
      courses: [
        { id: 1, name: "Algebra", progress: 80 },
        { id: 2, name: "Biology", progress: 75 },
      ],
    },
    {
      id: 2,
      name: "Liam",
      grade: "6th",
      courses: [
        { id: 1, name: "English Literature", progress: 90 },
        { id: 2, name: "World History", progress: 85 },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Parent Dashboard</h2>
      <Tabs defaultValue="progress" className="space-y-4">
        <TabsList>
          <TabsTrigger value="progress">Children's Progress</TabsTrigger>
          <TabsTrigger value="communication">Teacher Communication</TabsTrigger>
        </TabsList>
        <TabsContent value="progress" className="space-y-4">
          {children.map((child) => (
            <Card key={child.id}>
              <CardHeader>
                <CardTitle>{child.name}</CardTitle>
                <CardDescription>Grade: {child.grade}</CardDescription>
              </CardHeader>
              <CardContent>
                {child.courses.map((course) => (
                  <div key={course.id} className="mb-4">
                    <p>{course.name}</p>
                    <Progress value={course.progress} className="w-full" />
                    <p className="mt-2 text-sm text-gray-500">{course.progress}% Complete</p>
                  </div>
                ))}
                <Button>View Detailed Report</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Communications</CardTitle>
              <CardDescription>Recent messages from teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Communication content goes here</p>
              <Button className="mt-4">Send Message to Teacher</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

