"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CourseCreation() {
  const [courses, setCourses] = useState([
    { id: 1, title: "Introduction to JavaScript", price: 49.99, status: "Published" },
    { id: 2, title: "Advanced React Techniques", price: 79.99, status: "Draft" },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Builder</CardTitle>
          <CardDescription>Create and customize your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="course-title">Course Title</Label>
              <Input id="course-title" placeholder="Enter course title" />
            </div>
            <div>
              <Label htmlFor="course-description">Course Description</Label>
              <Textarea id="course-description" placeholder="Enter course description" />
            </div>
            <div>
              <Label htmlFor="course-type">Course Type</Label>
              <Select>
                <SelectTrigger id="course-type">
                  <SelectValue placeholder="Select course type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video Course</SelectItem>
                  <SelectItem value="text">Text-based Course</SelectItem>
                  <SelectItem value="mixed">Mixed Media</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Create Course</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Marketplace</CardTitle>
          <CardDescription>Manage and sell your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {courses.map((course) => (
              <li key={course.id} className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{course.title}</h4>
                  <p className="text-sm text-gray-500">${course.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      course.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {course.status}
                  </span>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

