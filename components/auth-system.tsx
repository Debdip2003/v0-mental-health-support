"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff, Shield, CheckCircle } from "lucide-react";
import { generateUserId } from "@/lib/utils";

interface User {
  userId: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
}

interface AuthSystemProps {
  onLogin: (user: User) => void;
}

const institutions = [
  "University of Delhi",
  "Jawaharlal Nehru University",
  "Indian Institute of Technology Delhi",
  "Jamia Millia Islamia",
  "Guru Gobind Singh Indraprastha University",
  "Ambedkar University Delhi",
  "Delhi Technological University",
  "Netaji Subhas University of Technology",
  "Meghnad Saha Institute of Technology",
  "Other",
];

export function AuthSystem({ onLogin }: AuthSystemProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    email: "",
    phone: "",
    institution: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would authenticate with an API
    const user: User = {
      userId: generateUserId(),
      name: "", // Username removed, use userId instead
      email: loginData.email,
      phone: "+91 9876543210", // This would come from the API
      institution: "University of Delhi", // This would come from the API
    };
    onLogin(user);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    const userData: User = {
      userId: generateUserId(),
      name: "", // Username removed, use userId instead
      email: signupData.email,
      phone: signupData.phone,
      institution: signupData.institution,
    };
    setIsSubmitted(true);
    setTimeout(() => {
      onLogin(userData);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-serif font-bold mb-4">
            Account Created!
          </h3>
          <p className="text-muted-foreground mb-6">
            Welcome to our mental health support platform. You'll be logged in
            shortly.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            MindCare
          </h1>
          <p className="text-muted-foreground">
            Your mental health support platform
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center font-serif">Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="your.email@university.edu"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        placeholder="Enter your password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <div className="text-center">
                    <Button variant="link" className="text-sm">
                      Forgot password?
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email *</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="your.email@university.edu"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number *</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      value={signupData.phone}
                      onChange={(e) =>
                        setSignupData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-institution">Institution *</Label>
                    <Select
                      value={signupData.institution}
                      onValueChange={(value) =>
                        setSignupData((prev) => ({
                          ...prev,
                          institution: value,
                        }))
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your institution" />
                      </SelectTrigger>
                      <SelectContent>
                        {institutions.map((institution) => (
                          <SelectItem key={institution} value={institution}>
                            {institution}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        placeholder="Create a password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password *</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) =>
                        setSignupData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-4 bg-card rounded-lg border">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm mb-1">
                    Privacy & Security
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your data is encrypted and protected. We follow strict
                    confidentiality guidelines for mental health platforms.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Username modal removed; userId is generated automatically */}
    </>
  );
}
