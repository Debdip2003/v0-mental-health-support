"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  institution: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if localStorage is available
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      const savedUser = localStorage.getItem("mindcare-user");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing saved user:", error);
          localStorage.removeItem("mindcare-user");
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);

    // Check if localStorage is available before setting
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("mindcare-user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error setting localStorage:", error);
      }
    }
  };

  const logout = () => {
    setUser(null);

    // Check if localStorage is available before removing
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("mindcare-user");
      } catch (error) {
        console.error("Error clearing localStorage:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
