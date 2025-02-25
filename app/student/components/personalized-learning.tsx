"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { AIPersonalizationService } from "@/app/services/ai-personalization"
import { Progress } from "@/components/ui/progress"
import { Course } from "@prisma/client"

export function PersonalizedLearning() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([])
  const [learningStyle, setLearningStyle] = useState<any>(null)
  const [studyPath, setStudyPath] = useState<any[]>([])
  
  const aiService = new AIPersonalizationService()

  useEffect(() => {
    const fetchPersonalizedData = async () => {
      try {
        // Fetch personalized recommendations
        const recommendations = await aiService.generatePersonalizedRecommendations('user-id')
        setRecommendedCourses(recommendations)

        // Generate study path for the current course
        const path = await aiService.generateStudyPath('user-id', 'current-course-id')
        setStudyPath(path)

        // Predict performance
        const predictedScore = await aiService.predictPerformance('user-id', 'current-course-id')
        console.log('Predicted performance:', predictedScore)
      } catch (error) {
        console.error('Error fetching personalized data:', error)
      }
    }

    fetchPersonalizedData()
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Driven Recommendations</CardTitle>
          <CardDescription>Personalized courses based on your interests and goals</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendedCourses.map((course) => (
              <li key={course.id} className="flex items-center justify-between">
                <span>{course.title}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <Button variant="outline" size="sm">
                    Enroll
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Smart Study Timetable</CardTitle>
          <CardDescription>Your personalized study schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Today's Schedule</h3>
              <ul className="space-y-2">
                <li>9:00 AM - Introduction to Machine Learning</li>
                <li>11:00 AM - Data Structures Quiz</li>
                <li>2:00 PM - JavaScript Study Group</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

