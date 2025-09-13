"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, AlertTriangle, Phone } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "crisis" | "coping" | "normal";
}

const copingStrategies = [
  "Try the 4-7-8 breathing technique: Inhale for 4, hold for 7, exhale for 8",
  "Practice grounding: Name 5 things you can see, 4 you can hear, 3 you can touch",
  "Take a 10-minute walk outside if possible",
  "Listen to calming music or nature sounds",
  "Write down three things you're grateful for today",
];

const crisisKeywords = [
  "suicide",
  "kill myself",
  "end it all",
  "hurt myself",
  "die",
  "hopeless",
];

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
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const detectCrisis = (message: string): boolean => {
    return crisisKeywords.some((keyword) =>
      message.toLowerCase().includes(keyword)
    );
  };

  const callAIBackend = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch("http://localhost:5010/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI backend");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error calling AI backend:", error);
      // Fallback to local response if backend is unavailable
      return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or consider reaching out to our counseling services directly.";
    }
  };

  const generateResponse = async (userMessage: string): Promise<Message> => {
    const isCrisis = detectCrisis(userMessage);

    if (isCrisis) {
      return {
        id: Date.now().toString(),
        content:
          "I'm concerned about what you've shared. Your safety is important. Please reach out to a crisis counselor immediately at 988 (Suicide & Crisis Lifeline) or contact campus emergency services. Would you like me to help you find immediate support resources?",
        sender: "bot",
        timestamp: new Date(),
        type: "crisis",
      };
    }

    // Call the AI backend for intelligent responses
    const aiResponse = await callAIBackend(userMessage);

    return {
      id: Date.now().toString(),
      content: aiResponse,
      sender: "bot",
      timestamp: new Date(),
      type: "normal",
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const botResponse = await generateResponse(currentInput);
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content:
          "I'm sorry, I'm having trouble processing your message right now. Please try again or contact our support team.",
        sender: "bot",
        timestamp: new Date(),
        type: "normal",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[700px] flex flex-col bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-b border-primary/10 p-6 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-semibold text-foreground">
              MindCare AI Assistant
            </h2>
            <p className="text-sm text-muted-foreground font-medium">
              Confidential support • Available 24/7 • Crisis resources available
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area with Custom Scrollbar */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-b from-transparent to-slate-50/30 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "bot" && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 shadow-sm border border-primary/10 mt-1">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              )}

              <div
                className={`max-w-[80%] ${
                  message.sender === "user" ? "order-1" : ""
                }`}
              >
                <div
                  className={`rounded-2xl p-5 shadow-sm ${
                    message.sender === "user"
                      ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground ml-auto"
                      : message.type === "crisis"
                      ? "bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 shadow-red-100/50"
                      : "bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-slate-100/50"
                  }`}
                >
                  {message.type === "crisis" && (
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <Badge
                        variant="destructive"
                        className="text-xs font-medium"
                      >
                        Crisis Support
                      </Badge>
                    </div>
                  )}

                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  </div>

                  {message.type === "crisis" && (
                    <div className="mt-4 pt-3 border-t border-red-200/60">
                      <div className="flex items-center gap-2 text-sm bg-red-100/50 rounded-lg p-3">
                        <Phone className="h-4 w-4 text-red-600" />
                        <span className="font-semibold text-red-800">
                          Crisis Hotline: 988
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground mt-2 px-5 font-medium">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {message.sender === "user" && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-200 mt-1">
                  <User className="h-5 w-5 text-slate-600" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center shadow-sm border border-primary/10 mt-1">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-5 shadow-slate-100/50">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-slate-200/60 bg-white/60 backdrop-blur-sm flex-shrink-0">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share how you're feeling..."
            className="flex-1 h-12 rounded-xl border-slate-200/60 bg-white/90 backdrop-blur-sm shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-sm"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="h-12 w-12 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center font-medium">
          This is a supportive tool, not a replacement for professional help
        </p>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
      `}</style>
    </div>
  );
}
