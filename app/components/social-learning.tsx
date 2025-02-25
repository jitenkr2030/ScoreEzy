"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SocialLearning() {
  const [posts, setPosts] = useState([
    { id: 1, user: "Alice", content: "Just finished my math assignment. Anyone want to review it?", likes: 5 },
    { id: 2, user: "Bob", content: "Found a great resource for our history project!", likes: 3 },
  ])
  const [newPost, setNewPost] = useState("")

  const addPost = () => {
    if (newPost.trim()) {
      setPosts([{ id: posts.length + 1, user: "You", content: newPost, likes: 0 }, ...posts])
      setNewPost("")
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Social Learning</CardTitle>
        <CardDescription>Connect with classmates and share resources</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts or resources..."
            className="mb-2"
          />
          <Button onClick={addPost}>Post</Button>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="border rounded-md p-4">
              <div className="flex items-center mb-2">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.user}`} />
                  <AvatarFallback>{post.user[0]}</AvatarFallback>
                </Avatar>
                <span className="font-bold">{post.user}</span>
              </div>
              <p className="mb-2">{post.content}</p>
              <Button variant="outline" size="sm">
                Like ({post.likes})
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

