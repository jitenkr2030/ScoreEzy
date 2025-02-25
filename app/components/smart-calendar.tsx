"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"

export function SmartCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const events = [
    { date: new Date(2023, 5, 15), title: "Math Exam", type: "exam" },
    { date: new Date(2023, 5, 18), title: "History Project Due", type: "assignment" },
    { date: new Date(2023, 5, 20), title: "Live Science Class", type: "class" },
  ]

  const getDateEvents = (day: Date) => {
    return events.filter((event) => event.date.toDateString() === day.toDateString())
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Smart Calendar</CardTitle>
        <CardDescription>Your personalized academic schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          components={{
            DayContent: (props) => {
              const dayEvents = getDateEvents(props.date)
              return (
                <div className="relative h-full w-full p-2">
                  <span>{props.date.getDate()}</span>
                  {dayEvents.map((event, index) => (
                    <Badge key={index} variant="secondary" className="absolute bottom-0 right-0 text-xs">
                      {event.type[0].toUpperCase()}
                    </Badge>
                  ))}
                </div>
              )
            },
          }}
        />
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Today's Events:</h3>
          <ul className="space-y-2">
            {getDateEvents(date || new Date()).map((event, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Badge variant="outline">{event.type}</Badge>
                <span>{event.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

