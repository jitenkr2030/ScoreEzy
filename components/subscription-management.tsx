"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Subscription {
  id: string
  name: string
  price: number
  description: string
  features: string[]
}

export function SubscriptionManagement() {
  const { data: session } = useSession()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [currentSubscription, setCurrentSubscription] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Fetch available subscriptions and user's current subscription
    const fetchSubscriptions = async () => {
      const res = await fetch("/api/subscriptions")
      const data = await res.json()
      setSubscriptions(data.subscriptions)
      setCurrentSubscription(data.currentSubscription)
    }
    fetchSubscriptions()
  }, [])

  const handleSubscribe = async (subscriptionId: string) => {
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId }),
      })
      const data = await res.json()
      if (data.success) {
        setCurrentSubscription(subscriptionId)
        toast({
          title: "Subscription Updated",
          description: "Your subscription has been successfully updated.",
        })
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Subscription Plans</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {subscriptions.map((sub) => (
          <Card key={sub.id}>
            <CardHeader>
              <CardTitle>{sub.name}</CardTitle>
              <CardDescription>${sub.price}/month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {sub.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <Button
                className="mt-4 w-full"
                onClick={() => handleSubscribe(sub.id)}
                disabled={currentSubscription === sub.id}
              >
                {currentSubscription === sub.id ? "Current Plan" : "Subscribe"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

