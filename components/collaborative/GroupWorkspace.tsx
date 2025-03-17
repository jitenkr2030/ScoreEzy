"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  description: string
  assignee: string
  status: "todo" | "in-progress" | "completed"
  dueDate: Date
}

interface Document {
  id: string
  name: string
  type: string
  url: string
  uploadedBy: string
  uploadedAt: Date
}

interface Project {
  id: string
  name: string
  description: string
  members: string[]
  tasks: Task[]
  documents: Document[]
}

export function GroupWorkspace() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Final Year Project",
      description: "Developing an AI-powered learning assistant",
      members: ["John Doe", "Jane Smith", "Alice Johnson"],
      tasks: [
        {
          id: "t1",
          title: "Research AI Models",
          description: "Compare different AI models for our use case",
          assignee: "John Doe",
          status: "completed",
          dueDate: new Date("2024-03-15")
        },
        {
          id: "t2",
          title: "Design UI Mockups",
          description: "Create initial UI designs for the application",
          assignee: "Jane Smith",
          status: "in-progress",
          dueDate: new Date("2024-03-20")
        }
      ],
      documents: [
        {
          id: "d1",
          name: "Project Proposal.pdf",
          type: "pdf",
          url: "/documents/proposal.pdf",
          uploadedBy: "John Doe",
          uploadedAt: new Date("2024-03-01")
        }
      ]
    }
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: ""
  })

  const handleCreateTask = (projectId: string) => {
    if (!newTask.title || !newTask.description || !newTask.assignee || !newTask.dueDate) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignee: newTask.assignee,
      status: "todo",
      dueDate: new Date(newTask.dueDate)
    }

    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return { ...project, tasks: [...project.tasks, task] }
      }
      return project
    }))

    setNewTask({
      title: "",
      description: "",
      assignee: "",
      dueDate: ""
    })
  }

  const handleUpdateTaskStatus = (projectId: string, taskId: string, newStatus: Task['status']) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: newStatus }
          }
          return task
        })
        return { ...project, tasks: updatedTasks }
      }
      return project
    }))
  }

  const getStatusColor = (status: string): "default" | "destructive" | "outline" | "secondary" => {
    switch (status.toLowerCase()) {
      case "completed":
        return "secondary"
      case "in progress":
        return "default"
      case "blocked":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6 p-4">
      {projects.map((project) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <p className="text-sm text-gray-500">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.members.map((member) => (
                <Avatar key={member} className="h-8 w-8">
                  <AvatarFallback>{member[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Tasks Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Tasks</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {["todo", "in-progress", "completed"].map((status) => (
                    <div key={status} className="space-y-2">
                      <h4 className="font-medium capitalize">{status.replace("-", " ")}</h4>
                      <div className="space-y-2">
                        {project.tasks
                          .filter((task) => task.status === status)
                          .map((task) => (
                            <Card key={task.id}>
                              <CardContent className="p-4">
                                <h5 className="font-medium">{task.title}</h5>
                                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                                <div className="flex items-center justify-between mt-2">
                                  <Badge variant={getStatusColor(task.status)}>
                                    {task.status}
                                  </Badge>
                                  <span className="text-sm text-gray-500">
                                    Due: {task.dueDate.toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="flex items-center mt-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{task.assignee[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm ml-2">{task.assignee}</span>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Task Form */}
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-4">Add New Task</h4>
                    <div className="space-y-4">
                      <Input
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      />
                      <Textarea
                        placeholder="Task Description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      />
                      <Input
                        placeholder="Assignee"
                        value={newTask.assignee}
                        onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      />
                      <Input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      />
                      <Button onClick={() => handleCreateTask(project.id)}>Add Task</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Documents Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Documents</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {project.documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">📄</span>
                            <div>
                              <h5 className="font-medium">{doc.name}</h5>
                              <p className="text-sm text-gray-500">
                                Uploaded by {doc.uploadedBy} on {doc.uploadedAt.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Download</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Document Upload */}
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-4">Upload Document</h4>
                    <div className="flex items-center space-x-2">
                      <Input type="file" />
                      <Button>Upload</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}