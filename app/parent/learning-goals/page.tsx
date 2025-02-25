"use client"

import { LearningGoals } from "../components/learning-goals"

export default function LearningGoalsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">Learning Goals</h1>
      <LearningGoals />
    </div>
  )
}