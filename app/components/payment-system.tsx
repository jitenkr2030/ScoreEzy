"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PaymentSystem() {
  const [plan, setPlan] = useState("monthly")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Subscription & Payment</CardTitle>
        <CardDescription>Choose your plan and payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <Label>Select Your Plan</Label>
            <RadioGroup value={plan} onValueChange={setPlan} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <Label htmlFor="monthly">Monthly ($9.99/mo)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly">Yearly ($99.99/yr)</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Payment Method</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem
                  value="paypal<cut_off_point>
card"
                >
                  Credit Card
                </SelectItem>
                <SelectItem
                  value="paypal
</cut_off_point>

"
                >
                  PayPal
                </SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="card-number">Card Number</Label>
            <Input id="card-number" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input id="expiry-date" placeholder="MM/YY" />
            </div>
            <div className="flex-1">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>
          <Button className="w-full">Subscribe Now</Button>
        </form>
      </CardContent>
    </Card>
  )
}

