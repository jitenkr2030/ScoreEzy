"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function Integrations() {
  const [integrations, setIntegrations] = useState({
    crm: false,
    paymentGateway: false,
    marketingTools: false,
  })

  const toggleIntegration = (key) => {
    setIntegrations((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const saveIntegrations = () => {
    // Implement integration save logic here
    console.log("Saving integrations:", integrations)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Integrations</CardTitle>
          <CardDescription>Manage third-party platform integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="crm" checked={integrations.crm} onCheckedChange={() => toggleIntegration("crm")} />
              <Label htmlFor="crm">CRM Integration</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="paymentGateway"
                checked={integrations.paymentGateway}
                onCheckedChange={() => toggleIntegration("paymentGateway")}
              />
              <Label htmlFor="paymentGateway">Payment Gateway Integration</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="marketingTools"
                checked={integrations.marketingTools}
                onCheckedChange={() => toggleIntegration("marketingTools")}
              />
              <Label htmlFor="marketingTools">Marketing Tools Integration</Label>
            </div>
            <Button onClick={saveIntegrations}>Save Integrations</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

