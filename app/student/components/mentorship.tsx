"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Mentorship() {
  const tutors = [
    { id: 1, name: "Dr. Jane Smith", subject: "Machine Learning", rating: 4.8 },
    { id: 2, name: "Prof. Michael Johnson", subject: "Web Development", rating: 4.9 },
    { id: 3, name: "Sarah Lee, PhD", subject: "Data Science", rating: 4.7 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Find Tutors</CardTitle>
          <CardDescription>Book one-on-one sessions with expert tutors</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {tutors.map((tutor) => (
              <li key={tutor.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/avatars/${tutor.id}.png`} alt={tutor.name} />
                    <AvatarFallback>
                      {tutor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{tutor.name}</h4>
                    <p className="text-sm text-gray-500">{tutor.subject}</p>
                    <p className="text-sm">Rating: {tutor.rating}/5</p>
                  </div>
                </div>
                <Button>Book Session</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

