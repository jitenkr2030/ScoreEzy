"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PersonalizedLearning } from "./components/personalized-learning"
import { StudyTools } from "./components/study-tools"
import { Achievements } from "./components/achievements"
import { OfflineCourses } from "./components/offline-courses"
import { GroupStudy } from "./components/group-study"
import { Mentorship } from "./components/mentorship"
import { ProgressDashboard } from "./components/progress-dashboard"

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("personalized-learning")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">Student Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="personalized-learning">Learning Path</TabsTrigger>
          <TabsTrigger value="study-tools">Study Tools</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="offline-courses">Offline Courses</TabsTrigger>
          <TabsTrigger value="group-study">Group Study</TabsTrigger>
          <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        <TabsContent value="personalized-learning">
          <PersonalizedLearning />
        </TabsContent>
        <TabsContent value="study-tools">
          <StudyTools />
        </TabsContent>
        <TabsContent value="achievements">
          <Achievements />
        </TabsContent>
        <TabsContent value="offline-courses">
          <OfflineCourses />
        </TabsContent>
        <TabsContent value="group-study">
          <GroupStudy />
        </TabsContent>
        <TabsContent value="mentorship">
          <Mentorship />
        </TabsContent>
        <TabsContent value="progress">
          <ProgressDashboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}

