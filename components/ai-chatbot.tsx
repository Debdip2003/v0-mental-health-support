"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, AlertTriangle, Phone } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "crisis" | "coping" | "normal"
}

const copingStrategies = [
  "Try the 4-7-8 breathing technique: Inhale for 4, hold for 7, exhale for 8",
  "Practice grounding: Name 5 things you can see, 4 you can hear, 3 you can touch",
  "Take a 10-minute walk outside if possible",
  "Listen to calming music or nature sounds",
  "Write down three things you're grateful for today",
]

const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "die", "hopeless"]

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm here to support you. How are you feeling today? You can share what's on your mind, and I'll do my best to help.",
      sender: "bot",
      timestamp: new Date(),
      type: "normal",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const detectCrisis = (message: string): boolean => {
    return crisisKeywords.some((keyword) => message.toLowerCase().includes(keyword))
  }

  const generateResponse = (userMessage: string): Message => {
    const isCrisis = detectCrisis(userMessage)

    if (isCrisis) {
      return {
        id: Date.now().toString(),
        content:
          "I'm concerned about what you've shared. Your safety is important. Please reach out to a crisis counselor immediately at 988 (Suicide & Crisis Lifeline) or contact campus emergency services. Would you like me to help you find immediate support resources?",
        sender: "bot",
        timestamp: new Date(),
        type: "crisis",
      }
    }

    // Simple rule-based responses for MVP
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety")) {
      const strategy = copingStrategies[Math.floor(Math.random() * copingStrategies.length)]
      return {
        id: Date.now().toString(),
        content: `I understand you're feeling anxious. Here's a coping strategy that might help: ${strategy}. Remember, anxiety is temporary and you have the strength to get through this.`,
        sender: "bot",
        timestamp: new Date(),
        type: "coping",
      }
    }

    if (lowerMessage.includes("stressed") || lowerMessage.includes("overwhelmed")) {
      return {
        id: Date.now().toString(),
        content:
          "Feeling overwhelmed is completely normal, especially as a student. Try breaking down your tasks into smaller, manageable steps. Would you like to talk about what's causing the most stress?",
        sender: "bot",
        timestamp: new Date(),
        type: "coping",
      }
    }

    if (lowerMessage.includes("sad") || lowerMessage.includes("depressed")) {
      return {
        id: Date.now().toString(),
        content:
          "I hear that you're going through a difficult time. It's brave of you to reach out. Consider connecting with a counselor who can provide personalized support. In the meantime, try to maintain your daily routines and reach out to trusted friends or family.",
        sender: "bot",
        timestamp: new Date(),
        type: "coping",
      }
    }

    return {
      id: Date.now().toString(),
      content:
        "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about how you're feeling? If you need immediate help, remember that campus counseling services are available.",
      sender: "bot",
      timestamp: new Date(),
      type: "normal",
    }
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateResponse(input)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="bg-card border-b">
        <CardTitle className="flex items-center gap-2 font-serif">
          <Bot className="h-5 w-5 text-primary" />
          MindCare AI Assistant
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Confidential support • Available 24/7 • Crisis resources available
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}

                <div className={`max-w-[80%] ${message.sender === "user" ? "order-1" : ""}`}>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : message.type === "crisis"
                          ? "bg-destructive/10 border border-destructive/20"
                          : "bg-card border"
                    }`}
                  >
                    {message.type === "crisis" && (
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        <Badge variant="destructive" className="text-xs">
                          Crisis Support
                        </Badge>
                      </div>
                    )}

                    <p className="text-sm leading-relaxed">{message.content}</p>

                    {message.type === "crisis" && (
                      <div className="mt-3 pt-3 border-t border-destructive/20">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4" />
                          <span className="font-medium">Crisis Hotline: 988</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground mt-1 px-3">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-card border rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-background">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share how you're feeling..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!input.trim() || isTyping} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This is a supportive tool, not a replacement for professional help
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
