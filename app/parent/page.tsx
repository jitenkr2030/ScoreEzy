"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressTracking } from "./components/progress-tracking"
import { CustomAlerts } from "./components/custom-alerts"
import { ParentTeacherCommunication } from "./components/parent-teacher-communication"
import { LearningGoals } from "./components/learning-goals"
import { FamilyLearningHub } from "./components/family-learning-hub"

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState("progress-tracking")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">Parent Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="progress-tracking">Progress Tracking</TabsTrigger>
          <TabsTrigger value="custom-alerts">Custom Alerts</TabsTrigger>
          <TabsTrigger value="parent-teacher-communication">Communication</TabsTrigger>
          <TabsTrigger value="learning-goals">Learning Goals</TabsTrigger>
          <TabsTrigger value="family-learning-hub">Family Learning Hub</TabsTrigger>
        </TabsList>
        <TabsContent value="progress-tracking">
          <ProgressTracking />
        </TabsContent>
        <TabsContent value="custom-alerts">
          <CustomAlerts />
        </TabsContent>
        <TabsContent value="parent-teacher-communication">
          <ParentTeacherCommunication />
        </TabsContent>
        <TabsContent value="learning-goals">
          <LearningGoals />
        </TabsContent>
        <TabsContent value="family-learning-hub">
          <FamilyLearningHub />
        </TabsContent>
      </Tabs>
    </div>
  )
}

