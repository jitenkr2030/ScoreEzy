"use client"

import { Suspense, useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import { Card } from "@/components/ui/card"
import { DatabaseErrorBoundary } from "@/components/database-error-boundary"

const TeachingTools = dynamic(() => import("./components/teaching-tools"), { ssr: false })
const CourseCreation = dynamic(() => import("./components/course-creation").then(mod => ({ default: mod.CourseCreation })), { ssr: false })
const StudentInsights = dynamic(() => import("./components/student-insights").then(mod => ({ default: mod.StudentInsights })), { ssr: false })
const CollaborationTools = dynamic(() => import("./components/collaboration-tools").then(mod => ({ default: mod.CollaborationTools })), { ssr: false })
const ContentUpdates = dynamic(() => import("./components/content-updates").then(mod => ({ default: mod.ContentUpdates })), { ssr: false })

function LoadingFallback() {
  return (
    <Card className="p-6">
      <div className="h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    </Card>
  )
}

function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Card className="p-6">
      <div className="text-red-500">
        <h3 className="text-lg font-semibold">Something went wrong</h3>
        <p>{error.message}</p>
      </div>
    </Card>
  )
}

export default function InstructorDashboard() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("teaching-tools")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingFallback />
  }

  return (
    <DatabaseErrorBoundary>
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-10">Instructor Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="teaching-tools">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="teaching-tools">Teaching Tools</TabsTrigger>
          <TabsTrigger value="course-creation">Course Creation</TabsTrigger>
          <TabsTrigger value="student-insights">Student Insights</TabsTrigger>
          <TabsTrigger value="collaboration-tools">Collaboration</TabsTrigger>
          <TabsTrigger value="content-updates">Content Updates</TabsTrigger>
        </TabsList>
        <TabsContent value="teaching-tools">
          <Suspense fallback={<LoadingFallback />}>
            <TeachingTools />
          </Suspense>
        </TabsContent>
        <TabsContent value="course-creation">
          <Suspense fallback={<LoadingFallback />}>
            <CourseCreation />
          </Suspense>
        </TabsContent>
        <TabsContent value="student-insights">
          <Suspense fallback={<LoadingFallback />}>
            <StudentInsights />
          </Suspense>
        </TabsContent>
        <TabsContent value="collaboration-tools">
          <Suspense fallback={<LoadingFallback />}>
            <CollaborationTools />
          </Suspense>
        </TabsContent>
        <TabsContent value="content-updates">
          <Suspense fallback={<LoadingFallback />}>
            <ContentUpdates />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
    </DatabaseErrorBoundary>
  )
}

