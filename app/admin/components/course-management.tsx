"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CourseManagementService } from "@/app/services/course-management-service"

export function CourseManagement() {
  const [courses, setCourses] = useState([
    { id: 1, name: "Introduction to React", instructor: "John Doe", status: "pending", version: "1.0", price: 0 },
    { id: 2, name: "Advanced JavaScript", instructor: "Jane Smith", status: "approved", version: "2.1", price: 29.99 },
  ])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isVersionDialogOpen, setIsVersionDialogOpen] = useState(false)
  const [isMarketplaceDialogOpen, setIsMarketplaceDialogOpen] = useState(false)
  const [changes, setChanges] = useState('')
  const [price, setPrice] = useState('')

  const courseService = new CourseManagementService()

  const handleVersionUpdate = async (courseId) => {
    try {
      const newVersion = await courseService.createCourseVersion(courseId, changes)
      setCourses(courses.map(course =>
        course.id === courseId ? { ...course, version: newVersion.version } : course
      ))
      setIsVersionDialogOpen(false)
      setChanges('')
    } catch (error) {
      console.error('Failed to update version:', error)
    }
  }

  const handlePublishToMarketplace = async (courseId) => {
    try {
      await courseService.publishToMarketplace(courseId, parseFloat(price))
      setCourses(courses.map(course =>
        course.id === courseId ? { ...course, price: parseFloat(price) } : course
      ))
      setIsMarketplaceDialogOpen(false)
      setPrice('')
    } catch (error) {
      console.error('Failed to publish to marketplace:', error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Management</CardTitle>
          <CardDescription>Manage courses, versions, and marketplace listings</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>
                    <Badge variant={course.status === "approved" ? "default" : "secondary"}>{course.status}</Badge>
                  </TableCell>
                  <TableCell>{course.version}</TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell className="space-x-2">
                    {course.status === "pending" && (
                      <Button variant="outline" size="sm" onClick={() => approveCourse(course.id)}>
                        Approve
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCourse(course)
                        setIsVersionDialogOpen(true)
                      }}
                    >
                      Update Version
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCourse(course)
                        setIsMarketplaceDialogOpen(true)
                      }}
                    >
                      Publish to Marketplace
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isVersionDialogOpen} onOpenChange={setIsVersionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Course Version</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Version Changes</label>
              <Input
                value={changes}
                onChange={(e) => setChanges(e.target.value)}
                placeholder="Describe the changes in this version"
              />
            </div>
            <Button onClick={() => handleVersionUpdate(selectedCourse?.id)}>Save Version</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isMarketplaceDialogOpen} onOpenChange={setIsMarketplaceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish to Marketplace</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Course Price (USD)</label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter course price"
              />
            </div>
            <Button onClick={() => handlePublishToMarketplace(selectedCourse?.id)}>Publish</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

