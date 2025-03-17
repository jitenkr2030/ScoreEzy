"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  createdAt: Date
  replies: Reply[]
}

interface Reply {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  createdAt: Date
}

export function DiscussionForum() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Understanding React Hooks",
      content: "Can someone explain how useEffect works?",
      author: {
        name: "John Doe",
        avatar: "/avatars/john.jpg"
      },
      createdAt: new Date(),
      replies: [
        {
          id: "1-1",
          content: "useEffect runs after every render. You can think of it as React's way of handling side effects.",
          author: {
            name: "Jane Smith",
            avatar: "/avatars/jane.jpg"
          },
          createdAt: new Date()
        }
      ]
    }
  ])

  const [newPost, setNewPost] = useState({ title: "", content: "" })
  const [replyContent, setReplyContent] = useState("")
  const [activePost, setActivePost] = useState<string | null>(null)

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        name: "Current User", // This would come from auth context
        avatar: "/avatars/default.jpg"
      },
      createdAt: new Date(),
      replies: []
    }

    setPosts([post, ...posts])
    setNewPost({ title: "", content: "" })
  }

  const handleCreateReply = (postId: string) => {
    if (!replyContent) return

    const reply: Reply = {
      id: Date.now().toString(),
      content: replyContent,
      author: {
        name: "Current User", // This would come from auth context
        avatar: "/avatars/default.jpg"
      },
      createdAt: new Date()
    }

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, replies: [...post.replies, reply] }
      }
      return post
    }))

    setReplyContent("")
    setActivePost(null)
  }

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Discussion Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              placeholder="What would you like to discuss?"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
            <Button onClick={handleCreatePost}>Post Discussion</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <p className="text-sm text-gray-500">
                    {post.author.name} · {post.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{post.content}</p>
              
              <div className="space-y-4">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={reply.author.avatar} />
                        <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{reply.author.name}</span>
                      <span className="text-sm text-gray-500">
                        {reply.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{reply.content}</p>
                  </div>
                ))}

                {activePost === post.id ? (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Write a reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <div className="flex space-x-2">
                      <Button onClick={() => handleCreateReply(post.id)}>Reply</Button>
                      <Button variant="outline" onClick={() => setActivePost(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => setActivePost(post.id)}
                  >
                    Reply to Discussion
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}