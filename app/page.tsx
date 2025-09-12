"use client"

import { AppWrapper } from "@/components/app-wrapper"
import { AIChatbot } from "@/components/ai-chatbot"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Calendar, BookOpen, Shield, Users, Clock, Heart, ClipboardList } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <AppWrapper>
      <div className="bg-background">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">Comprehensive Mental Health Support</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Our platform provides multiple pathways to mental wellness, ensuring you get the right support when you
                need it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-serif">AI Assistant</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Get immediate support and coping strategies from our AI chatbot, available 24/7
                  </p>
                  <Button asChild className="w-full">
                    <Link href="#chatbot">Start Chat</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Calendar className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-lg font-serif">Book Appointment</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Schedule confidential sessions with licensed counselors who understand student needs
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/appointments">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-serif">Resources</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Access guides, articles, and audio content in multiple languages for mental wellness
                  </p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/resources">Explore</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-serif">Peer Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with others in a safe community space with AI-moderated discussions
                  </p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/peer-support">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                    <ClipboardList className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg font-serif">Assessment Tests</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Take PHQ-9, GAD-7, and GHQ assessments to understand your mental health
                  </p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/assessments">Take Assessment</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Completely Confidential</h3>
                <p className="text-sm text-muted-foreground">
                  HIPAA compliant platform with end-to-end encryption protecting your privacy
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Available 24/7</h3>
                <p className="text-sm text-muted-foreground">
                  AI support and crisis resources accessible anytime you need help
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-serif font-semibold mb-2">Community Support</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with peers and volunteers in a safe, moderated environment
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Chatbot Section */}
        <section className="py-16 bg-card/30" id="chatbot">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif font-bold mb-4">AI Mental Health Assistant</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Get immediate support and coping strategies. Our AI assistant provides rule-based guidance and can
                  connect you with crisis resources when needed.
                </p>
              </div>

              <AIChatbot />
            </div>
          </div>
        </section>
      </div>
    </AppWrapper>
  )
}
