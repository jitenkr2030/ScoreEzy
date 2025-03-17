"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface RubricCriterion {
  id: string
  name: string
  description: string
  maxScore: number
}

interface Review {
  id: string
  submissionId: string
  reviewerId: string
  reviewerName: string
  scores: {
    criterionId: string
    score: number
    comment: string
  }[]
  overallComment: string
  createdAt: Date
}

interface Submission {
  id: string
  title: string
  description: string
  authorId: string
  authorName: string
  content: string
  attachments: string[]
  status: "pending" | "in-review" | "reviewed"
  reviews: Review[]
  createdAt: Date
}

export function PeerReview() {
  const [rubric] = useState<RubricCriterion[]>([
    {
      id: "1",
      name: "Content Quality",
      description: "Accuracy and depth of subject matter",
      maxScore: 5
    },
    {
      id: "2",
      name: "Organization",
      description: "Logical flow and structure",
      maxScore: 5
    },
    {
      id: "3",
      name: "Presentation",
      description: "Clarity and professionalism",
      maxScore: 5
    }
  ])

  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: "1",
      title: "Machine Learning Project",
      description: "Implementation of a neural network",
      authorId: "user1",
      authorName: "John Doe",
      content: "Project details and implementation...",
      attachments: ["project.pdf"],
      status: "in-review",
      reviews: [],
      createdAt: new Date()
    }
  ])

  const [activeSubmission, setActiveSubmission] = useState<string | null>(null)
  const [review, setReview] = useState({
    scores: rubric.map(criterion => ({
      criterionId: criterion.id,
      score: 0,
      comment: ""
    })),
    overallComment: ""
  })

  const handleSubmitReview = (submissionId: string) => {
    if (!review.overallComment) return

    const newReview: Review = {
      id: Date.now().toString(),
      submissionId,
      reviewerId: "currentUser", // Would come from auth context
      reviewerName: "Current User",
      scores: review.scores,
      overallComment: review.overallComment,
      createdAt: new Date()
    }

    setSubmissions(submissions.map(submission => {
      if (submission.id === submissionId) {
        return {
          ...submission,
          reviews: [...submission.reviews, newReview],
          status: "reviewed"
        }
      }
      return submission
    }))

    setActiveSubmission(null)
    setReview({
      scores: rubric.map(criterion => ({
        criterionId: criterion.id,
        score: 0,
        comment: ""
      })),
      overallComment: ""
    })
  }

  const getAverageScore = (reviews: Review[]) => {
    if (reviews.length === 0) return 0
    const totalScore = reviews.reduce((acc, review) => {
      const reviewScore = review.scores.reduce((sum, score) => sum + score.score, 0)
      return acc + (reviewScore / review.scores.length)
    }, 0)
    return totalScore / reviews.length
  }

  return (
    <div className="space-y-6 p-4">
      {submissions.map((submission) => (
        <Card key={submission.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{submission.title}</CardTitle>
                <p className="text-sm text-gray-500">
                  by {submission.authorName} · {submission.createdAt.toLocaleDateString()}
                </p>
              </div>
              <Badge
                variant={submission.status === "reviewed" ? "default" : "secondary"}
              >
                {submission.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>{submission.description}</p>
              
              {submission.attachments.length > 0 && (
                <div className="flex gap-2">
                  {submission.attachments.map((attachment) => (
                    <Button key={attachment} variant="outline" size="sm">
                      📎 {attachment}
                    </Button>
                  ))}
                </div>
              )}

              {activeSubmission === submission.id ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Submit Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {rubric.map((criterion) => (
                      <div key={criterion.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{criterion.name}</h4>
                            <p className="text-sm text-gray-500">{criterion.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {Array.from({ length: criterion.maxScore }, (_, i) => i + 1).map((score) => (
                              <Button
                                key={score}
                                variant={review.scores.find(s => s.criterionId === criterion.id)?.score === score ? "default" : "outline"}
                                size="sm"
                                onClick={() => setReview({
                                  ...review,
                                  scores: review.scores.map(s =>
                                    s.criterionId === criterion.id ? { ...s, score } : s
                                  )
                                })}
                              >
                                {score}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <Textarea
                          placeholder="Comments for this criterion"
                          value={review.scores.find(s => s.criterionId === criterion.id)?.comment}
                          onChange={(e) => setReview({
                            ...review,
                            scores: review.scores.map(s =>
                              s.criterionId === criterion.id ? { ...s, comment: e.target.value } : s
                            )
                          })}
                        />
                      </div>
                    ))}
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Overall Comments</h4>
                      <Textarea
                        placeholder="Provide overall feedback"
                        value={review.overallComment}
                        onChange={(e) => setReview({ ...review, overallComment: e.target.value })}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => handleSubmitReview(submission.id)}>Submit Review</Button>
                      <Button variant="outline" onClick={() => setActiveSubmission(null)}>Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {submission.reviews.length > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Average Score</span>
                            <span className="text-sm font-medium">
                              {getAverageScore(submission.reviews).toFixed(1)} / 5
                            </span>
                          </div>
                          <Progress value={getAverageScore(submission.reviews) * 20} />
                        </div>
                      </div>

                      {submission.reviews.map((review) => (
                        <Card key={review.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Avatar>
                                <AvatarFallback>{review.reviewerName[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{review.reviewerName}</p>
                                <p className="text-sm text-gray-500">
                                  {review.createdAt.toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              {review.scores.map((score) => {
                                const criterion = rubric.find(c => c.id === score.criterionId)
                                return criterion ? (
                                  <div key={score.criterionId}>
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">{criterion.name}</span>
                                      <span className="text-sm">{score.score} / {criterion.maxScore}</span>
                                    </div>
                                    {score.comment && (
                                      <p className="text-sm text-gray-500 mt-1">{score.comment}</p>
                                    )}
                                  </div>
                                ) : null
                              })}
                              
                              <div className="mt-4 pt-4 border-t">
                                <p className="text-sm font-medium">Overall Feedback</p>
                                <p className="text-sm text-gray-500 mt-1">{review.overallComment}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Button onClick={() => setActiveSubmission(submission.id)}>
                      Write Review
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}