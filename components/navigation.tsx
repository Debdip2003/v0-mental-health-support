"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  ClipboardList,
  Phone,
  Shield,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const navigation = [
  {
    name: "AI Assistant",
    href: "/",
    icon: MessageCircle,
    description: "Chat with our AI support bot",
  },
  {
    name: "Book Appointment",
    href: "/appointments",
    icon: Calendar,
    description: "Schedule with counselors",
  },
  {
    name: "Resources",
    href: "/resources",
    icon: BookOpen,
    description: "Guides and wellness content",
  },
  {
    name: "Peer Support",
    href: "/peer-support",
    icon: Users,
    description: "Connect with community",
  },
  {
    name: "Assessment Tests",
    href: "/assessments",
    icon: ClipboardList,
    description: "Mental health evaluations",
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="border-b bg-card backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-serif font-bold text-xl text-foreground">
              MindCare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User Profile & Crisis Hotline */}
          <div className="hidden lg:flex items-center gap-4">
            {/* User Profile */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-muted/50">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  {user?.userId}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user?.institution}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="ml-2 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-serif font-bold text-xl text-foreground">
                    MindCare
                  </span>
                </div>

                <div className="space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs opacity-70">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t pt-6">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-destructive" />
                      <span className="font-medium text-sm">
                        Crisis Support
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      If you're in crisis, call the Suicide & Crisis Lifeline
                      immediately.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="destructive"
                        className="font-mono text-lg"
                      >
                        988
                      </Badge>
                      <span className="text-sm">Available 24/7</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  {/* User Profile Section */}
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg mb-4">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{user?.userId}</div>
                      <div className="text-xs text-muted-foreground">
                        {user?.institution}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      title="Logout"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-card rounded-lg border">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm mb-1">
                        Privacy Protected
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        All conversations and appointments are confidential and
                        secure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
