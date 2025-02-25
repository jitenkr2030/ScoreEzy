"use client"

import { CustomAlerts } from "../components/custom-alerts"

export default function CustomAlertsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">Custom Alerts</h1>
      <CustomAlerts />
    </div>
  )
}