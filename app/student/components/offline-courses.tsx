"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function OfflineCourses() {
  const offlineCourses = [
    { id: 1, title: "Introduction to Python", size: "500 MB" },
    { id: 2, title: "Web Development Fundamentals", size: "750 MB" },
    { id: 3, title: "Data Science Essentials", size: "1.2 GB" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Offline Course Access</CardTitle>
          <CardDescription>Download courses for offline study</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {offlineCourses.map((course) => (
              <li key={course.id} className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">{course.title}</h4>
                  <p className="text-sm text-gray-500">Size: {course.size}</p>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

