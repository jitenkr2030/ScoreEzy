"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "./components/user-management"
import { Analytics } from "./components/analytics"
import { CourseManagement } from "./components/course-management"
import { Settings } from "./components/settings"
import { Integrations } from "./components/integrations"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("user-management")

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">Admin Dashboard</h1>
      <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="user-management">User Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="course-management">Course Management</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          <TabsContent value="user-management">
            <UserManagement />
          </TabsContent>
          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>
          <TabsContent value="course-management">
            <CourseManagement />
          </TabsContent>
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
          <TabsContent value="integrations">
            <Integrations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

