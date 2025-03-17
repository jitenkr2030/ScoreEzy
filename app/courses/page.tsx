"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function CoursesPage() {
  const { toast } = useToast()
  const [courses] = useState([
    {
      id: 1,
      title: "Introduction to Programming",
      description: "Learn the basics of programming with this comprehensive course",
      instructor: "John Doe",
      price: 49.99,
      rating: 4.5,
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      description: "Master the core concepts of web development",
      instructor: "Jane Smith",
      price: 59.99,
      rating: 4.8,
    },
  ])

  const handleEnroll = async (courseId: number) => {
    try {
      const response = await fetch('/api/purchase-course', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Successfully enrolled in the course!",
        })
      } else {
        throw new Error(data.error || 'Failed to enroll')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to enroll in course",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>By {course.instructor}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">${course.price}</span>
                <Button onClick={() => handleEnroll(course.id)}>Enroll Now</Button>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Rating: {course.rating}/5
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}