"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export function UserRegistration() {
  const [userRole, setUserRole] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    school: "",
    grade: "",
    expertise: "",
    certifications: "",
    institution: ""
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: userRole })
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Registration successful! Please login.",
        })
        router.push("/login")
      } else {
        throw new Error(data.message || "Registration failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Registration failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>User Registration</CardTitle>
        <CardDescription>Create your ScoreEzy account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="role">Select Role</Label>
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="instructor">Instructor</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>
          {userRole === "student" || userRole === "parent" ? (
            <div>
              <Label htmlFor="school">School (Optional)</Label>
              <Input
                id="school"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="Enter your school name"
              />
            </div>
          ) : null}
          {userRole === "student" || userRole === "parent" ? (
            <div>
              <Label htmlFor="grade">Grade/Class</Label>
              <Input
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                placeholder="Enter your grade or class"
                required
              />
            </div>
          ) : null}
          {userRole === "instructor" ? (
            <>
              <div>
                <Label htmlFor="expertise">Expertise</Label>
                <Input
                  id="expertise"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  placeholder="Enter your area of expertise"
                  required
                />
              </div>
              <div>
                <Label htmlFor="certifications">Certifications</Label>
                <Input
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  placeholder="Enter your certifications"
                  required
                />
              </div>
            </>
          ) : null}
          {userRole === "admin" ? (
            <div>
              <Label htmlFor="institution">Institution Details</Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Enter your institution details"
                required
              />
            </div>
          ) : null}
          <Button type="submit" className="w-full" disabled={loading}>
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

