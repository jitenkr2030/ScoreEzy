"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TeachingTools } from "./components/teaching-tools"
import { CourseCreation } from "./components/course-creation"
import { StudentInsights } from "./components/student-insights"
import { CollaborationTools } from "./components/collaboration-tools"
import { ContentUpdates } from "./components/content-updates"

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("teaching-tools")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">Instructor Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="teaching-tools">Teaching Tools</TabsTrigger>
          <TabsTrigger value="course-creation">Course Creation</TabsTrigger>
          <TabsTrigger value="student-insights">Student Insights</TabsTrigger>
          <TabsTrigger value="collaboration-tools">Collaboration</TabsTrigger>
          <TabsTrigger value="content-updates">Content Updates</TabsTrigger>
        </TabsList>
        <TabsContent value="teaching-tools">
          <TeachingTools />
        </TabsContent>
        <TabsContent value="course-creation">
          <CourseCreation />
        </TabsContent>
        <TabsContent value="student-insights">
          <StudentInsights />
        </TabsContent>
        <TabsContent value="collaboration-tools">
          <CollaborationTools />
        </TabsContent>
        <TabsContent value="content-updates">
          <ContentUpdates />
        </TabsContent>
      </Tabs>
    </div>
  )
}

