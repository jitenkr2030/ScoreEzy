"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { PaymentService } from '@/app/services/payment-service'

interface PaymentFormProps {
  amount: number
  courseId: string
  courseName: string
  userId: string
  userEmail: string
  userName: string
  userPhone: string
}

export function PaymentForm({
  amount,
  courseId,
  courseName,
  userId,
  userEmail,
  userName,
  userPhone
}: PaymentFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const paymentService = new PaymentService()

  const handlePayment = async () => {
    try {
      setLoading(true)

      const orderId = `order_${Date.now()}_${userId}`
      const order = await paymentService.createOrder({
        orderId,
        orderAmount: amount,
        customerDetails: {
          customerId: userId,
          customerEmail: userEmail,
          customerName: userName,
          customerPhone: userPhone
        },
        orderMeta: {
          returnUrl: `${window.location.origin}/payment/callback`,
          notifyUrl: `${window.location.origin}/api/payment/webhook`,
        }
      })

      // Redirect to Cashfree payment page
      window.location.href = order.paymentLink

    } catch (error) {
      console.error('Payment error:', error)
      toast({
        title: 'Payment Error',
        description: 'Failed to initiate payment. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Complete Purchase</CardTitle>
        <CardDescription>Secure payment powered by Cashfree</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Order Summary</h3>
          <div className="text-sm text-gray-500">
            <p>{courseName}</p>
            <p className="font-medium text-black">₹{amount}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Billing Details</h3>
          <div className="text-sm text-gray-500">
            <p>{userName}</p>
            <p>{userEmail}</p>
            <p>{userPhone}</p>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : `Pay ₹${amount}`}
        </Button>

        <p className="text-xs text-center text-gray-500">
          By clicking Pay, you agree to our terms and conditions
        </p>
      </CardContent>
    </Card>
  )
}