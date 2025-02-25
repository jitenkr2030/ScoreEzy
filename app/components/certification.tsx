"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Certification() {
  const completedCourses = [
    { id: 1, name: "Introduction to Python", date: "2023-05-15" },
    { id: 2, name: "Web Development Fundamentals", date: "2023-06-01" },
  ]

  const earnedBadges = [
    { id: 1, name: "Python Master", description: "Completed all Python courses" },
    { id: 2, name: "Quick Learner", description: "Finished 5 courses in a month" },
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Certifications & Achievements</CardTitle>
        <CardDescription>Your completed courses and earned badges</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Completed Courses</h3>
          <ul className="space-y-2">
            {completedCourses.map((course) => (
              <li key={course.id} className="flex items-center justify-between">
                <span>{course.name}</span>
                <div>
                  <span className="text-sm text-gray-500 mr-2">{course.date}</span>
                  <Button variant="outline" size="sm">
                    Download Certificate
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Earned Badges</h3>
          <div className="flex flex-wrap gap-2">
            {earnedBadges.map((badge) => (
              <Badge key={badge.id} variant="secondary" className="text-sm py-1 px-2">
                {badge.name}
                <span className="block text-xs text-gray-500">{badge.description}</span>
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

