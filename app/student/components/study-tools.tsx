"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function StudyTools() {
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces" },
    { id: 2, question: "What is JSX?", answer: "A syntax extension for JavaScript used with React" },
  ])

  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")

  const addFlashcard = () => {
    if (newQuestion && newAnswer) {
      setFlashcards([...flashcards, { id: Date.now(), question: newQuestion, answer: newAnswer }])
      setNewQuestion("")
      setNewAnswer("")
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Flashcards</CardTitle>
          <CardDescription>Create and review your custom flashcards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flashcards.map((card) => (
              <div key={card.id} className="border p-4 rounded-md">
                <h4 className="font-semibold">{card.question}</h4>
                <p className="mt-2">{card.answer}</p>
              </div>
            ))}
            <div className="space-y-2">
              <Input
                placeholder="Enter question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <Textarea placeholder="Enter answer" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
              <Button onClick={addFlashcard}>Add Flashcard</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Peer Reviews & Feedback</CardTitle>
          <CardDescription>Share assignments and receive feedback from peers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h4 className="font-semibold">JavaScript Project</h4>
              <p className="mt-2">Submitted by: John Doe</p>
              <Button variant="outline" className="mt-2">
                Review
              </Button>
            </div>
            <div className="border p-4 rounded-md">
              <h4 className="font-semibold">Machine Learning Essay</h4>
              <p className="mt-2">Submitted by: Jane Smith</p>
              <Button variant="outline" className="mt-2">
                Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

