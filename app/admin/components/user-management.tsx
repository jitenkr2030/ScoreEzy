"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [userRole, setUserRole] = useState("all")

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">User Management</h3>
          <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Students</SelectItem>
                <SelectItem value="instructor">Instructors</SelectItem>
                <SelectItem value="parent">Parents</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            {/* User list will be rendered here */}
            <div className="text-center text-muted-foreground">
              No users found matching your criteria
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

