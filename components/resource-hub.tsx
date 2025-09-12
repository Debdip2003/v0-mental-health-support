"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Play, Download, Search, Clock, Users, Star, Video } from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  type: "article" | "guide" | "audio" | "video"
  category: string
  language: string
  duration?: string
  rating: number
  downloads: number
  tags: string[]
  content?: string
  audioUrl?: string
  videoUrl?: string // Added video URL field
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Understanding Anxiety: A Student's Guide",
    description: "Comprehensive guide to recognizing and managing anxiety symptoms in academic settings.",
    type: "guide",
    category: "Anxiety",
    language: "English",
    duration: "15 min read",
    rating: 4.8,
    downloads: 1247,
    tags: ["anxiety", "coping", "academic"],
    content:
      "This guide covers the basics of anxiety, common triggers for students, and practical coping strategies...",
  },
  {
    id: "2",
    title: "Breathing Exercises for Stress Relief",
    description: "Guided audio session with breathing techniques to reduce stress and promote relaxation.",
    type: "audio",
    category: "Stress Management",
    language: "English",
    duration: "10 min",
    rating: 4.9,
    downloads: 892,
    tags: ["breathing", "relaxation", "stress"],
    audioUrl: "/audio/breathing-exercises.mp3",
  },
  {
    id: "3",
    title: "মানসিক স্বাস্থ্য এবং চাপ ব্যবস্থাপনা",
    description: "বিশ্ববিদ্যালয়ের ছাত্রছাত্রীদের জন্য মানসিক স্বাস্থ্য এবং চাপ নিয়ন্ত্রণের গাইড।",
    type: "guide",
    category: "Stress Management",
    language: "Bengali",
    duration: "12 min read",
    rating: 4.7,
    downloads: 634,
    tags: ["চাপ", "মানসিক স্বাস্থ্য", "ছাত্র"],
    content: "এই গাইডে মানসিক চাপ নিয়ন্ত্রণের কার্যকর কৌশল রয়েছে...",
  },
  {
    id: "4",
    title: "Building Healthy Sleep Habits",
    description: "Evidence-based strategies for improving sleep quality and establishing consistent sleep routines.",
    type: "article",
    category: "Wellness",
    language: "English",
    duration: "8 min read",
    rating: 4.6,
    downloads: 1156,
    tags: ["sleep", "habits", "wellness"],
    content: "Good sleep is fundamental to mental health. This article explores...",
  },
  {
    id: "5",
    title: "Mindfulness Meditation for Beginners",
    description: "Gentle introduction to mindfulness practices with guided meditation sessions.",
    type: "audio",
    category: "Mindfulness",
    language: "English",
    duration: "20 min",
    rating: 4.8,
    downloads: 2103,
    tags: ["mindfulness", "meditation", "beginner"],
    audioUrl: "/audio/mindfulness-intro.mp3",
  },
  {
    id: "6",
    title: "मानसिक स्वास्थ्य की देखभाल",
    description: "छात्रों के लिए मानसिक स्वास्थ्य की बुनियादी जानकारी और सुझाव।",
    type: "guide",
    category: "General Wellness",
    language: "Hindi",
    duration: "10 min read",
    rating: 4.5,
    downloads: 423,
    tags: ["मानसिक स्वास्थ्य", "छात्र", "देखभाल"],
    content: "यह गाइड मानसिक स्वास्थ्य की बुनियादी बातों को कवर करता है...",
  },
  {
    id: "7",
    title: "Coping with Academic Pressure",
    description: "Video guide on managing academic stress and maintaining work-life balance.",
    type: "video",
    category: "Stress Management",
    language: "English",
    duration: "15 min",
    rating: 4.9,
    downloads: 1567,
    tags: ["academic", "pressure", "balance"],
    videoUrl: "/videos/academic-pressure.mp4",
  },
  {
    id: "8",
    title: "শিক্ষার্থীদের জন্য মানসিক স্বাস্থ্য",
    description: "শিক্ষার্থীদের মানসিক স্বাস্থ্য রক্ষার উপায় নিয়ে ভিডিয়ো গাইড।",
    type: "video",
    category: "General Wellness",
    language: "Bengali",
    duration: "12 min",
    rating: 4.6,
    downloads: 789,
    tags: ["মানসিক স্বাস্থ্য", "শিক্ষার্থী", "গাইড"],
    videoUrl: "/videos/mental-health-bengali.mp4",
  },
  {
    id: "9",
    title: "तनाव प्रबंधন तकनीकें",
    description: "तनाव को कम करने और मानसिक शांति पाने के लिए व्यावहारिक तकनीकों का वीडियो।",
    type: "video",
    category: "Stress Management",
    language: "Hindi",
    duration: "18 min",
    rating: 4.7,
    downloads: 1234,
    tags: ["तनाव", "प्रबंधन", "तकनीक"],
    videoUrl: "/videos/stress-management-hindi.mp4",
  },
]

const categories = ["All", "Anxiety", "Stress Management", "Wellness", "Mindfulness", "General Wellness"]
const languages = ["All", "English", "Hindi", "Bengali"]

export function ResourceHub() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
    const matchesLanguage = selectedLanguage === "All" || resource.language === selectedLanguage

    return matchesSearch && matchesCategory && matchesLanguage
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
      case "guide":
        return <BookOpen className="h-4 w-4" />
      case "audio":
        return <Play className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" /> // Added video icon
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article":
        return "bg-blue-100 text-blue-800"
      case "guide":
        return "bg-green-100 text-green-800"
      case "audio":
        return "bg-purple-100 text-purple-800"
      case "video":
        return "bg-red-100 text-red-800" // Added video color
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (selectedResource) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={() => setSelectedResource(null)} className="mb-6">
          ← Back to Resources
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="font-serif text-2xl mb-2">{selectedResource.title}</CardTitle>
                <p className="text-muted-foreground mb-4">{selectedResource.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedResource.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    {selectedResource.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    {selectedResource.downloads} downloads
                  </div>
                </div>
              </div>
              <Badge className={getTypeColor(selectedResource.type)}>
                {getTypeIcon(selectedResource.type)}
                <span className="ml-1 capitalize">{selectedResource.type}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {selectedResource.type === "audio" && selectedResource.audioUrl && (
              <div className="mb-6 p-4 bg-card rounded-lg border">
                <div className="flex items-center gap-4">
                  <Button size="sm" className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Play Audio
                  </Button>
                  <div className="flex-1 bg-muted h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full w-0" />
                  </div>
                  <span className="text-sm text-muted-foreground">0:00 / {selectedResource.duration}</span>
                </div>
              </div>
            )}

            {selectedResource.type === "video" && selectedResource.videoUrl && (
              <div className="mb-6 p-4 bg-card rounded-lg border">
                <div className="flex items-center gap-4">
                  <Button size="sm" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Watch Video
                  </Button>
                  <div className="flex-1 bg-muted h-2 rounded-full">
                    <div className="bg-primary h-2 rounded-full w-0" />
                  </div>
                  <span className="text-sm text-muted-foreground">0:00 / {selectedResource.duration}</span>
                </div>
              </div>
            )}

            {selectedResource.content && (
              <div className="prose prose-sm max-w-none">
                <p>{selectedResource.content}</p>
                <p className="text-muted-foreground italic">
                  [This is a preview. The full content would be displayed here in a real implementation.]
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                {selectedResource.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resource Categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger> {/* Added videos tab */}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getTypeColor(resource.type)}>
                      {getTypeIcon(resource.type)}
                      <span className="ml-1 capitalize">{resource.type}</span>
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {resource.language}
                    </Badge>
                  </div>
                  <CardTitle className="font-serif text-lg leading-tight">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{resource.description}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {resource.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      {resource.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {resource.downloads}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{resource.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button onClick={() => setSelectedResource(resource)} className="w-full" size="sm">
                    {resource.type === "audio" ? "Listen" : resource.type === "video" ? "Watch" : "Read"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources
              .filter((r) => r.type === "guide")
              .map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getTypeColor(resource.type)}>
                        {getTypeIcon(resource.type)}
                        <span className="ml-1 capitalize">{resource.type}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.language}
                      </Badge>
                    </div>
                    <CardTitle className="font-serif text-lg leading-tight">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                    <Button onClick={() => setSelectedResource(resource)} className="w-full" size="sm">
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="audio">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources
              .filter((r) => r.type === "audio")
              .map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getTypeColor(resource.type)}>
                        {getTypeIcon(resource.type)}
                        <span className="ml-1 capitalize">{resource.type}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.language}
                      </Badge>
                    </div>
                    <CardTitle className="font-serif text-lg leading-tight">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                    <Button onClick={() => setSelectedResource(resource)} className="w-full" size="sm">
                      Listen
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="articles">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources
              .filter((r) => r.type === "article")
              .map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getTypeColor(resource.type)}>
                        {getTypeIcon(resource.type)}
                        <span className="ml-1 capitalize">{resource.type}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.language}
                      </Badge>
                    </div>
                    <CardTitle className="font-serif text-lg leading-tight">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                    <Button onClick={() => setSelectedResource(resource)} className="w-full" size="sm">
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources
              .filter((r) => r.type === "video")
              .map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={getTypeColor(resource.type)}>
                        {getTypeIcon(resource.type)}
                        <span className="ml-1 capitalize">{resource.type}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.language}
                      </Badge>
                    </div>
                    <CardTitle className="font-serif text-lg leading-tight">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                    <Button onClick={() => setSelectedResource(resource)} className="w-full" size="sm">
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No resources found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find relevant resources.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
