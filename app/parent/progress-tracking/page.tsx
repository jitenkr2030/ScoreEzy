"use client"

import { ProgressTracking } from "../components/progress-tracking"

export default function ProgressTrackingPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">Progress Tracking</h1>
      <ProgressTracking />
    </div>
  )
}