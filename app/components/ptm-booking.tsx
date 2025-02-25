"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"

type Teacher = {
  id: string
  name: string
  email: string
}

type TimeSlot = {
  time: string
  available: boolean
}

type Booking = {
  id: string
  teacherId: string
  studentId: string
  dateTime: Date
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
  notes?: string
}

export function PTMBooking() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [selectedTeacher, setSelectedTeacher] = useState<string>('')
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (session?.user?.email) {
      fetchTeachers()
      fetchUserBookings()
    }
  }, [session])

  useEffect(() => {
    if (selectedTeacher && date) {
      fetchAvailableTimeSlots()
    }
  }, [selectedTeacher, date])

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/teachers')
      const data = await response.json()
      setTeachers(data)
    } catch (error) {
      console.error('Error fetching teachers:', error)
    }
  }

  const fetchUserBookings = async () => {
    try {
      const response = await fetch('/api/ptm/bookings')
      const data = await response.json()
      setBookings(data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  const fetchAvailableTimeSlots = async () => {
    try {
      const response = await fetch(`/api/ptm/timeslots?teacherId=${selectedTeacher}&date=${date?.toISOString()}`)
      const data = await response.json()
      setTimeSlots(data)
    } catch (error) {
      console.error('Error fetching time slots:', error)
    }
  }

  const bookAppointment = async () => {
    if (!selectedTeacher || !date || !selectedTime || !session?.user?.id) return

    try {
      const response = await fetch('/api/ptm/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teacherId: selectedTeacher,
          studentId: session.user.id,
          dateTime: new Date(`${date.toISOString().split('T')[0]}T${selectedTime}`)
        })
      })

      const booking = await response.json()
      setBookings(prev => [...prev, booking])
      toast({
        title: "Appointment Booked",
        description: "Your PTM appointment has been scheduled successfully."
      })
    } catch (error) {
      console.error('Error booking appointment:', error)
      toast({
        title: "Booking Failed",
        description: "Failed to book the appointment. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Parent-Teacher Meeting</CardTitle>
          <CardDescription>Schedule a meeting with your teacher</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Select Teacher & Time</h3>
              <div className="space-y-4">
                <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map(teacher => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                />

                {timeSlots.length > 0 && (
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem
                          key={slot.time}
                          value={slot.time}
                          disabled={!slot.available}
                        >
                          {slot.time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                <Button
                  onClick={bookAppointment}
                  disabled={!selectedTeacher || !date || !selectedTime}
                  className="w-full"
                >
                  Book Appointment
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Your Bookings</h3>
              <div className="space-y-4">
                {bookings.map(booking => (
                  <Card key={booking.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {teachers.find(t => t.id === booking.teacherId)?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.dateTime).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-sm">
                          <span
                            className={`px-2 py-1 rounded-full ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}