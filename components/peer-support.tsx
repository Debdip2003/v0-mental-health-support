"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  Heart,
  Send,
  Shield,
  AlertTriangle,
  MessageSquare,
  X,
  Users,
  Plus,
  Search,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
} from "lucide-react";

interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  tags: string[];
  isVolunteer?: boolean;
}

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  volunteerCount: number;
  isJoined: boolean;
  category: string;
  icon: string;
  color: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  isVolunteer: boolean;
  isRead: boolean;
  messageType: "text" | "support" | "resource";
}

interface Volunteer {
  id: string;
  name: string;
  isOnline: boolean;
  specialty: string[];
  lastSeen: string;
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
];

const communities: Community[] = [
  {
    id: "depression",
    name: "Depression Support",
    description:
      "A safe space to share experiences and find support for depression",
    memberCount: 1247,
    volunteerCount: 23,
    isJoined: false,
    category: "Mental Health",
    icon: "💙",
    color: "blue",
  },
  {
    id: "anxiety",
    name: "Anxiety Warriors",
    description:
      "Coping strategies and support for anxiety and panic disorders",
    memberCount: 892,
    volunteerCount: 18,
    isJoined: true,
    category: "Mental Health",
    icon: "🌱",
    color: "green",
  },
  {
    id: "academic-stress",
    name: "Academic Stress Relief",
    description:
      "Support for students dealing with academic pressure and stress",
    memberCount: 1563,
    volunteerCount: 31,
    isJoined: false,
    category: "Student Life",
    icon: "📚",
    color: "purple",
  },
  {
    id: "relationships",
    name: "Healthy Relationships",
    description:
      "Building and maintaining healthy relationships and boundaries",
    memberCount: 634,
    volunteerCount: 12,
    isJoined: false,
    category: "Relationships",
    icon: "💕",
    color: "pink",
  },
  {
    id: "self-care",
    name: "Self-Care Circle",
    description: "Daily self-care practices and mindfulness techniques",
    memberCount: 743,
    volunteerCount: 15,
    isJoined: true,
    category: "Wellness",
    icon: "🧘",
    color: "orange",
  },
  {
    id: "crisis-support",
    name: "Crisis Support",
    description: "Immediate support for those in crisis situations",
    memberCount: 234,
    volunteerCount: 8,
    isJoined: false,
    category: "Crisis",
    icon: "🆘",
    color: "red",
  },
];

const volunteers: Volunteer[] = [
  {
    id: "1",
    name: "Dr. Debangshi Roy",
    isOnline: true,
    specialty: ["Depression", "Anxiety", "CBT"],
    lastSeen: "Online now",
  },
  {
    id: "2",
    name: "Debdip Bhattacharya",
    isOnline: true,
    specialty: ["Academic Stress", "Time Management"],
    lastSeen: "Online now",
  },
  {
    id: "3",
    name: "Ayush Saha Roy",
    isOnline: false,
    specialty: ["Relationships", "Self-Care"],
    lastSeen: "2 hours ago",
  },
  {
    id: "4",
    name: "Sahil Kumar Singh",
    isOnline: true,
    specialty: ["Crisis Support", "Trauma"],
    lastSeen: "Online now",
  },
];

const mockMessages: { [communityId: string]: Message[] } = {
  anxiety: [
    {
      id: "1",
      sender: "Alex Thompson",
      content:
        "Welcome to Anxiety Warriors! I'm here to help. Remember, you're not alone in this journey. 💚",
      timestamp: "10:30 AM",
      isOwn: false,
      isVolunteer: true,
      isRead: true,
      messageType: "support",
    },
    {
      id: "2",
      sender: "You",
      content: "Hi, I've been having panic attacks before exams. Any advice?",
      timestamp: "10:32 AM",
      isOwn: true,
      isVolunteer: false,
      isRead: true,
      messageType: "text",
    },
    {
      id: "3",
      sender: "Alex Thompson",
      content:
        "I understand how overwhelming that can feel. Here are some techniques that might help: 1) 4-7-8 breathing, 2) Grounding with 5-4-3-2-1 technique, 3) Progressive muscle relaxation. Would you like me to walk you through any of these?",
      timestamp: "10:35 AM",
      isOwn: false,
      isVolunteer: true,
      isRead: true,
      messageType: "support",
    },
  ],
  "self-care": [
    {
      id: "1",
      sender: "Maria Rodriguez",
      content:
        "Good morning! Today's self-care tip: Start with 5 minutes of mindful breathing. You deserve this time for yourself. 🌸",
      timestamp: "9:00 AM",
      isOwn: false,
      isVolunteer: true,
      isRead: true,
      messageType: "support",
    },
    {
      id: "2",
      sender: "You",
      content:
        "Thank you! I tried the breathing exercise and it really helped calm my mind.",
      timestamp: "9:15 AM",
      isOwn: true,
      isVolunteer: false,
      isRead: true,
      messageType: "text",
    },
  ],
};

export function PeerSupport() {
  // Original peer support state
  const [newPost, setNewPost] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isPrivateChatOpen, setIsPrivateChatOpen] = useState(false);

  // Community system state
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null
  );
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [communitiesData, setCommunitiesData] = useState(communities);

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
  ];

  const categories = [
    "All",
    ...Array.from(new Set(communities.map((c) => c.category))),
  ];

  const filteredCommunities = communitiesData.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const joinedCommunities = communitiesData.filter((c) => c.isJoined);
  const currentCommunity = communitiesData.find(
    (c) => c.id === selectedCommunity
  );

  // Original peer support functions
  const startPrivateChat = (username: string) => {
    setSelectedUser(username);
    setIsPrivateChatOpen(true);
    // Mock messages for demonstration
    setChatMessages([
      {
        id: "1",
        sender: username,
        content: `Hi! I saw your post and wanted to reach out. How are you doing?`,
        timestamp: "5 minutes ago",
        isOwn: false,
        isVolunteer: false,
        isRead: true,
        messageType: "text",
      },
    ]);
  };

  const sendPrivateMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "You",
        content: newMessage,
        timestamp: "Just now",
        isOwn: true,
        isVolunteer: false,
        isRead: true,
        messageType: "text",
      };
      setChatMessages((prev) => [...prev, message]);
      setNewMessage("");
    }
  };

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      // In a real app, this would submit to the backend
      console.log("New post:", { content: newPost, tags: selectedTags });
      setNewPost("");
      setSelectedTags([]);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const joinCommunity = (communityId: string) => {
    setCommunitiesData((prev) =>
      prev.map((community) =>
        community.id === communityId
          ? {
              ...community,
              isJoined: true,
              memberCount: community.memberCount + 1,
            }
          : community
      )
    );
  };

  const leaveCommunity = (communityId: string) => {
    setCommunitiesData((prev) =>
      prev.map((community) =>
        community.id === communityId
          ? {
              ...community,
              isJoined: false,
              memberCount: community.memberCount - 1,
            }
          : community
      )
    );
  };

  const openCommunityChat = (communityId: string) => {
    setSelectedCommunity(communityId);
    setIsChatOpen(true);
    setChatMessages(mockMessages[communityId] || []);
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedCommunity) {
      const message: Message = {
        id: Date.now().toString(),
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
        isVolunteer: false,
        isRead: true,
        messageType: "text",
      };
      setChatMessages((prev) => [...prev, message]);
      setNewMessage("");

      // Simulate volunteer response
      setTimeout(() => {
        const volunteer = volunteers.find((v) => v.isOnline);
        if (volunteer) {
          const response: Message = {
            id: (Date.now() + 1).toString(),
            sender: volunteer.name,
            content:
              "I'm here to help. Can you tell me more about what you're experiencing?",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isOwn: false,
            isVolunteer: true,
            isRead: false,
            messageType: "support",
          };
          setChatMessages((prev) => [...prev, response]);
        }
      }, 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Peer Support & Communities</h1>
        <p className="text-muted-foreground">
          Share your story, join communities, and connect with volunteers
        </p>
      </div>

      {/* Community Guidelines */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg font-serif text-blue-900">
              Community Guidelines
            </CardTitle>
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="create">Share Your Story</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          {/* Posts Feed */}
          {mockPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {post.isVolunteer ? "V" : "S"}
                      </AvatarFallback>
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
                      <span className="text-xs text-muted-foreground">
                        {post.timestamp}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startPrivateChat(post.author)}
                    className="text-xs"
                  >
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
              <CardTitle className="font-serif">
                Share Your Experience
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Your story might help someone else feel less alone. All posts
                are anonymous and moderated by AI for safety.
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
                <label className="text-sm font-medium mb-2 block">
                  Add tags (optional):
                </label>
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

        <TabsContent value="communities" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search communities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Communities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommunities.map((community) => (
              <Card
                key={community.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-${community.color}-100`}
                      >
                        {community.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{community.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {community.category}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {community.memberCount} members
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {community.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{community.volunteerCount} volunteers online</span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Active
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {community.isJoined ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() => openCommunityChat(community.id)}
                          className="flex-1"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Open Chat
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => leaveCommunity(community.id)}
                        >
                          Leave
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => joinCommunity(community.id)}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Join Community
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="volunteers" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {volunteers.map((volunteer) => (
              <Card
                key={volunteer.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="text-sm">
                        {volunteer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{volunteer.name}</h3>
                        <div className="flex items-center gap-1">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              volunteer.isOnline
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          ></div>
                          <span className="text-xs text-muted-foreground">
                            {volunteer.lastSeen}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {volunteer.specialty.map((spec) => (
                          <Badge
                            key={spec}
                            variant="secondary"
                            className="text-xs"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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

      {/* WhatsApp-like Community Chat Interface */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-4xl h-[600px] flex flex-col p-0">
          <div className="flex h-full">
            {/* Chat Header */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b bg-muted/50">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-${currentCommunity?.color}-100`}
                  >
                    {currentCommunity?.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{currentCommunity?.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {currentCommunity?.volunteerCount} volunteers online
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Welcome to {currentCommunity?.name}
                    </h3>
                    <p className="text-muted-foreground">
                      Start a conversation with the community and volunteers
                    </p>
                  </div>
                ) : (
                  chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isOwn ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          message.isOwn ? "order-2" : "order-1"
                        }`}
                      >
                        {!message.isOwn && (
                          <p className="text-xs text-muted-foreground mb-1 px-2">
                            {message.sender} {message.isVolunteer && "👨‍⚕️"}
                          </p>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            message.isOwn
                              ? "bg-primary text-primary-foreground rounded-br-sm"
                              : message.isVolunteer
                              ? "bg-green-100 border border-green-200 rounded-bl-sm"
                              : "bg-background border rounded-bl-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {message.content}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs opacity-70">
                              {message.timestamp}
                            </span>
                            {message.isOwn && (
                              <span className="text-xs opacity-70">
                                {message.isRead ? (
                                  <CheckCheck className="h-3 w-3" />
                                ) : (
                                  <Check className="h-3 w-3" />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-background">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Messages are monitored by volunteers for safety • End-to-end
                  encrypted
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Private Chat Dialog */}
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
                <div
                  key={message.id}
                  className={`flex ${
                    message.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.isOwn
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span
                      className={`text-xs ${
                        message.isOwn ? "text-blue-100" : "text-slate-500"
                      } mt-1 block`}
                    >
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
              <Button
                onClick={sendPrivateMessage}
                disabled={!newMessage.trim()}
              >
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
  );
}
