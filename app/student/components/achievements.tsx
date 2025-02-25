"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function Achievements() {
  const badges = [
    { id: 1, name: "Quick Learner", description: "Completed 5 courses in a month" },
    { id: 2, name: "Quiz Master", description: "Scored 100% in 10 quizzes" },
    { id: 3, name: "Consistent Performer", description: "Logged in for 30 consecutive days" },
  ]

  const leaderboard = [
    { id: 1, name: "Alice Johnson", points: 1200 },
    { id: 2, name: "Bob Smith", points: 1150 },
    { id: 3, name: "Charlie Brown", points: 1100 },
    { id: 4, name: "David Lee", points: 1050 },
    { id: 5, name: "Emma Davis", points: 1000 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Badges & Achievements</CardTitle>
          <CardDescription>Your earned badges and accomplishments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <Badge key={badge.id} variant="secondary" className="p-2">
                {badge.name}
                <span className="block text-xs text-gray-500">{badge.description}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
          <CardDescription>See where you rank among your peers</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {leaderboard.map((student, index) => (
              <li key={student.id} className="flex items-center justify-between">
                <span>
                  {index + 1}. {student.name}
                </span>
                <div className="flex items-center space-x-2">
                  <Progress value={student.points / 12} className="w-32" />
                  <span>{student.points} pts</span>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Challenge</CardTitle>
          <CardDescription>Complete today's challenge to earn points</CardDescription>
        </CardHeader>
        <CardContent>
          <h4 className="font-semibold">Solve 5 JavaScript coding problems</h4>
          <Progress value={60} className="mt-2" />
          <p className="mt-2">Progress: 3/5 completed</p>
        </CardContent>
      </Card>
    </div>
  )
}

