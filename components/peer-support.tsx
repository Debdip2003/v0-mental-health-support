"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { MessageCircle, Heart, Send, Shield, AlertTriangle, MessageSquare, X } from "lucide-react"

interface Post {
  id: string
  author: string
  content: string
  timestamp: string
  likes: number
  replies: number
  tags: string[]
  isVolunteer?: boolean
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: "Anonymous_Student_123",
    content:
      "I've been struggling with anxiety before exams. The breathing exercises from the resources section really helped me today. Just wanted to share in case anyone else is going through something similar.",
    timestamp: "2 hours ago",
    likes: 12,
    replies: 5,
    tags: ["anxiety", "coping-strategies", "exams"],
  },
  {
    id: "2",
    author: "MindfulHelper",
    content:
      "Remember that it's okay to have difficult days. What matters is that you're here, seeking support and connection. You're not alone in this journey. 💙",
    timestamp: "4 hours ago",
    likes: 28,
    replies: 8,
    tags: ["support", "encouragement"],
    isVolunteer: true,
  },
  {
    id: "3",
    author: "StudentWarrior",
    content:
      "Started therapy last month through the appointment system here. It was scary at first, but my counselor is amazing. For anyone hesitating - it's worth taking that first step.",
    timestamp: "1 day ago",
    likes: 45,
    replies: 12,
    tags: ["therapy", "encouragement", "first-step"],
  },
]

export function PeerSupport() {
  const [newPost, setNewPost] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isPrivateChatOpen, setIsPrivateChatOpen] = useState(false)

  const availableTags = [
    "anxiety",
    "depression",
    "stress",
    "coping-strategies",
    "therapy",
    "support",
    "encouragement",
    "exams",
    "relationships",
    "sleep",
  ]

  const startPrivateChat = (username: string) => {
    setSelectedUser(username)
    setIsPrivateChatOpen(true)
    // Mock messages for demonstration
    setChatMessages([
      {
        id: "1",
        sender: username,
        content: `Hi! I saw your post and wanted to reach out. How are you doing?`,
        timestamp: "5 minutes ago",
        isOwn: false,
      },
    ])
  }

  const sendPrivateMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "You",
        content: newMessage,
        timestamp: "Just now",
        isOwn: true,
      }
      setChatMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      // In a real app, this would submit to the backend
      console.log("New post:", { content: newPost, tags: selectedTags })
      setNewPost("")
      setSelectedTags([])
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Community Guidelines */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg font-serif text-blue-900">Community Guidelines</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">✓ Encouraged:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Share coping strategies and experiences</li>
                <li>• Offer support and encouragement</li>
                <li>• Ask questions about resources</li>
                <li>• Celebrate progress and victories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">✗ Not Allowed:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Personal identifying information</li>
                <li>• Crisis situations (use hotline: 988)</li>
                <li>• Harmful or triggering content</li>
                <li>• Medical advice or diagnosis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="feed" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="create">Share Your Story</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          {/* Posts Feed */}
          {mockPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{post.isVolunteer ? "V" : "S"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => startPrivateChat(post.author)}
                          className="font-medium text-sm hover:text-blue-600 transition-colors"
                        >
                          {post.author}
                        </button>
                        {post.isVolunteer && (
                          <Badge variant="secondary" className="text-xs">
                            Volunteer
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => startPrivateChat(post.author)} className="text-xs">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm leading-relaxed mb-4">{post.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.replies} replies</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          {/* Create Post */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif">Share Your Experience</CardTitle>
              <p className="text-sm text-muted-foreground">
                Your story might help someone else feel less alone. All posts are anonymous and moderated by AI for
                safety.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share your thoughts, experiences, or words of encouragement..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[120px] resize-none"
              />

              {/* Tag Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Add tags (optional):</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-border hover:border-primary"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <AlertTriangle className="h-4 w-4" />
                  <span>AI moderation active for community safety</span>
                </div>
                <Button onClick={handleSubmitPost} disabled={!newPost.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Share Anonymously
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Community Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-sm text-muted-foreground">Community Members</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-secondary">89</div>
            <p className="text-sm text-muted-foreground">Active Volunteers</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-accent">3,456</div>
            <p className="text-sm text-muted-foreground">Supportive Messages</p>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isPrivateChatOpen} onOpenChange={setIsPrivateChatOpen}>
        <DialogContent className="max-w-md h-[500px] flex flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Chat with {selectedUser}
              </DialogTitle>
             
            </div>
          </DialogHeader>

          <div className="flex-1 flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-slate-50 rounded-lg">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isOwn ? "bg-blue-600 text-white" : "bg-white border"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className={`text-xs ${message.isOwn ? "text-blue-100" : "text-slate-500"} mt-1 block`}>
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendPrivateMessage()}
                className="flex-1"
              />
              <Button onClick={sendPrivateMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-slate-500 mt-2 text-center">
              Private messages are encrypted and monitored for safety
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
