import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

export function FeedbackForm() {
  const [rating, setRating] = useState<string>('')
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the feedback to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
        <p className="text-gray-600">Your feedback has been submitted successfully.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Help Us Improve</h3>
        <p className="text-sm text-gray-600">We value your feedback. Please let us know about your experience.</p>
      </div>

      <div className="space-y-4">
        <Label>How would you rate your experience?</Label>
        <RadioGroup value={rating} onValueChange={setRating} className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="excellent" id="excellent" />
            <Label htmlFor="excellent">Excellent</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="good" id="good" />
            <Label htmlFor="good">Good</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fair" id="fair" />
            <Label htmlFor="fair">Fair</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="poor" id="poor" />
            <Label htmlFor="poor">Poor</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="feedback">Additional Comments</Label>
        <Textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Please share your thoughts..."
          className="min-h-[100px]"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !rating}
        className="w-full md:w-auto"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>
    </form>
  )
}