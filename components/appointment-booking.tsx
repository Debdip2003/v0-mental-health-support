"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, Shield, CheckCircle, Filter } from "lucide-react";
import { format } from "date-fns";
import { freemem } from "os";
import { fr } from "date-fns/locale";

interface Counselor {
  id: string;
  name: string;
  specialties: string[];
  availability: string[];
  languages: string[];
  institution: string; // Added institution field
  free: boolean;
  image: string; // Added image field
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AppointmentBookingProps {
  user: {
    userId: string;
    name: string;
    email: string;
    phone: string;
    institution: string;
  };
}

const counselors: Counselor[] = [
  // University of Delhi
  {
    id: "1",
    name: "Dr. Debangshi Roy",
    specialties: ["Anxiety", "Depression", "Academic Stress"],
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Hindi"],
    institution: "University of Delhi",
    free: true,
    image: "/placeholder-user.jpg",
  },
  {
    id: "2",
    name: "Dr. Debdip Bhattacharya",
    specialties: ["Relationship Issues", "Self-Esteem", "Life Transitions"],
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Bengali"],
    institution: "University of Delhi",
    free: true,
    image: "/professional-counsellor-headshot-.jpg",
  },
  {
    id: "3",
    name: "Dr. Soumalya Bakshi",
    specialties: ["Cultural Identity", "Family Conflicts", "Stress Management"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    languages: ["English", "Hindi", "Bengali"],
    institution: "University of Delhi",
    free: true,
    image: "/placeholder.jpg",
  },

  // Jawaharlal Nehru University
  {
    id: "4",
    name: "Dr. Priya Sharma",
    specialties: ["Research Stress", "PhD Anxiety", "Academic Pressure"],
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Hindi", "Tamil"],
    institution: "Jawaharlal Nehru University",
    free: true,
    image: "/placeholder-user.jpg",
  },
  {
    id: "5",
    name: "Dr. Rajesh Kumar",
    specialties: ["Social Anxiety", "Cultural Adjustment", "Peer Pressure"],
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Hindi", "Telugu"],
    institution: "Jawaharlal Nehru University",
    free: true,
    image: "/professional-counsellor-headshot-.jpg",
  },
  {
    id: "6",
    name: "Dr. Anjali Mehta",
    specialties: ["Career Guidance", "Work-Life Balance", "Leadership Skills"],
    availability: ["Monday", "Tuesday", "Thursday", "Friday"],
    languages: ["English", "Hindi", "Punjabi"],
    institution: "Jawaharlal Nehru University",
    free: true,
    image: "/placeholder.jpg",
  },

  // Indian Institute of Technology Delhi
  {
    id: "7",
    name: "Dr. Vikram Singh",
    specialties: [
      "Engineering Stress",
      "Competition Anxiety",
      "Technical Burnout",
    ],
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Hindi", "Marathi"],
    institution: "Indian Institute of Technology Delhi",
    free: true,
    image: "/placeholder-user.jpg",
  },
  {
    id: "8",
    name: "Dr. Neha Gupta",
    specialties: ["Academic Performance", "Time Management", "Goal Setting"],
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Hindi", "Gujarati"],
    institution: "Indian Institute of Technology Delhi",
    free: true,
    image: "/professional-counsellor-headshot-.jpg",
  },
  {
    id: "9",
    name: "Dr. Arjun Patel",
    specialties: ["Placement Anxiety", "Interview Stress", "Career Planning"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    languages: ["English", "Hindi", "Gujarati"],
    institution: "Indian Institute of Technology Delhi",
    free: true,
    image: "/placeholder.jpg",
  },

  // Jamia Millia Islamia
  {
    id: "10",
    name: "Dr. Fatima Khan",
    specialties: [
      "Cultural Identity",
      "Religious Stress",
      "Community Integration",
    ],
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Hindi", "Urdu"],
    institution: "Jamia Millia Islamia",
    free: true,
    image: "/placeholder-user.jpg",
  },
  {
    id: "11",
    name: "Dr. Mohammad Ali",
    specialties: ["Family Expectations", "Academic Pressure", "Social Skills"],
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Hindi", "Urdu", "Arabic"],
    institution: "Jamia Millia Islamia",
    free: true,
    image: "/professional-counsellor-headshot-.jpg",
  },
  {
    id: "12",
    name: "Dr. Aisha Rahman",
    specialties: [
      "Self-Confidence",
      "Communication Skills",
      "Emotional Regulation",
    ],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    languages: ["English", "Hindi", "Urdu"],
    institution: "Jamia Millia Islamia",
    free: true,
    image: "/placeholder.jpg",
  },

  // Guru Gobind Singh Indraprastha University
  {
    id: "13",
    name: "Dr. Harpreet Kaur",
    specialties: ["Academic Stress", "Time Management", "Study Skills"],
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Hindi", "Punjabi"],
    institution: "Guru Gobind Singh Indraprastha University",
    free: true,
    image: "/placeholder-user.jpg",
  },
  {
    id: "14",
    name: "Dr. Jasbir Singh",
    specialties: [
      "Career Counseling",
      "Professional Development",
      "Leadership",
    ],
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Hindi", "Punjabi"],
    institution: "Guru Gobind Singh Indraprastha University",
    free: true,
    image: "/professional-counsellor-headshot-.jpg",
  },
  {
    id: "15",
    name: "Dr. Manpreet Kaur",
    specialties: ["Relationship Issues", "Family Dynamics", "Personal Growth"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    languages: ["English", "Hindi", "Punjabi"],
    institution: "Guru Gobind Singh Indraprastha University",
    free: true,
    image: "/placeholder.jpg",
  },

  // Ambedkar University Delhi
  {
    id: "16",
    name: "Dr. Suresh Kumar",
    specialties: ["Social Justice", "Identity Issues", "Community Support"],
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Hindi", "Tamil"],
    institution: "Ambedkar University Delhi",
    free: true,
    image: "/placeholder-user.jpg",
  },
  {
    id: "17",
    name: "Dr. Kavita Devi",
    specialties: [
      "Academic Support",
      "Career Guidance",
      "Personal Development",
    ],
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Hindi", "Telugu"],
    institution: "Ambedkar University Delhi",
    free: true,
    image: "/professional-counsellor-headshot-.jpg",
  },
  {
    id: "18",
    name: "Dr. Ravi Shankar",
    specialties: ["Stress Management", "Mindfulness", "Emotional Well-being"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    languages: ["English", "Hindi", "Kannada"],
    institution: "Ambedkar University Delhi",
    free: true,
    image: "/placeholder.jpg",
  },

  // Delhi Technological University
  {
    id: "19",
    name: "Dr. Amit Kumar",
    specialties: [
      "Engineering Stress",
      "Technical Challenges",
      "Innovation Pressure",
    ],
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Hindi", "Bhojpuri"],
    institution: "Delhi Technological University",
    free: true,
    image: "/placeholder-user.jpg",
  },
  {
    id: "20",
    name: "Dr. Pooja Sharma",
    specialties: [
      "Academic Performance",
      "Project Management",
      "Team Dynamics",
    ],
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Hindi", "Rajasthani"],
    institution: "Delhi Technological University",
    free: true,
    image: "/professional-counsellor-headshot-.jpg",
  },
  {
    id: "21",
    name: "Dr. Rohit Verma",
    specialties: [
      "Career Planning",
      "Industry Preparation",
      "Skill Development",
    ],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    languages: ["English", "Hindi", "Haryanvi"],
    institution: "Delhi Technological University",
    free: true,
    image: "/placeholder.jpg",
  },

  // Netaji Subhas University of Technology
  {
    id: "22",
    name: "Dr. Ayush Saha Roy",
    specialties: ["Career Counseling", "Academic Pressure", "Social Anxiety"],
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Hindi", "Bengali"],
    institution: "Netaji Subhas University of Technology",
    free: false,
    image: "/professional-mental-health-counseling-session-with.jpg",
  },
  {
    id: "23",
    name: "Dr. Sahil Kumar Singh",
    specialties: ["Trauma", "PTSD", "Mindfulness"],
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Bengali", "Hindi"],
    institution: "Netaji Subhas University of Technology",
    free: false,
    image: "/placeholder-logo.png",
  },
  {
    id: "24",
    name: "Dr. Sneha Das",
    specialties: [
      "Academic Excellence",
      "Competition Stress",
      "Goal Achievement",
    ],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    languages: ["English", "Hindi", "Bengali"],
    institution: "Netaji Subhas University of Technology",
    free: false,
    image: "/placeholder.jpg",
  },

  // Meghnad Saha Institute of Technology
  {
    id: "25",
    name: "Dr. Rahul Banerjee",
    specialties: [
      "Technical Stress",
      "Innovation Anxiety",
      "Research Pressure",
    ],
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Hindi", "Bengali"],
    institution: "Meghnad Saha Institute of Technology",
    free: false,
    image: "/placeholder-user.jpg",
  },
  {
    id: "26",
    name: "Dr. Priyanka Ghosh",
    specialties: ["Academic Support", "Career Development", "Personal Growth"],
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Hindi", "Bengali"],
    institution: "Meghnad Saha Institute of Technology",
    free: false,
    image: "/professional-counsellor-headshot-.jpg",
  },
  {
    id: "27",
    name: "Dr. Subhankar Dutta",
    specialties: ["Leadership Skills", "Team Management", "Communication"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    languages: ["English", "Hindi", "Bengali"],
    institution: "Meghnad Saha Institute of Technology",
    free: false,
    image: "/placeholder.jpg",
  },
];

const timeSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "1:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: false },
  { time: "4:00 PM", available: true },
];

export function AppointmentBooking({ user }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedCounselor, setSelectedCounselor] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [institutionFilter, setInstitutionFilter] = useState<string>("All"); // Added institution filter
  const [formData, setFormData] = useState({
    reason: "",
    urgency: "",
    previousCounseling: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [selectedCounselorForChat, setSelectedCounselorForChat] =
    useState<string>("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<
    Array<{ id: string; sender: string; message: string; timestamp: string }>
  >([]);

  // Determine if counselor is free based on user's institution
  const getCounselorPricing = (counselor: Counselor) => {
    return counselor.institution === user.institution;
  };

  const filteredCounselors =
    institutionFilter === "All"
      ? counselors
      : counselors.filter(
          (counselor) => counselor.institution === institutionFilter
        );

  // Separate counselors by pricing
  const freeCounselors = filteredCounselors.filter((counselor) =>
    getCounselorPricing(counselor)
  );
  const paidCounselors = filteredCounselors.filter(
    (counselor) => !getCounselorPricing(counselor)
  );

  const institutions = [
    "All",
    ...Array.from(new Set(counselors.map((c) => c.institution))),
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    setIsSubmitted(true);
  };

  const startChat = (counselorId: string) => {
    setSelectedCounselorForChat(counselorId);
    setShowChat(true);
    setChatMessages([]);
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: "user",
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages((prev) => [...prev, newMessage]);
      setChatMessage("");

      // Simulate counselor response
      setTimeout(() => {
        const counselorResponse = {
          id: (Date.now() + 1).toString(),
          sender: "counselor",
          message:
            "Thank you for reaching out. I understand you're going through a difficult time. Can you tell me more about what's been troubling you?",
          timestamp: new Date().toLocaleTimeString(),
        };
        setChatMessages((prev) => [...prev, counselorResponse]);
      }, 1000);
    }
  };

  const selectedCounselorData = counselors.find(
    (c) => c.id === selectedCounselor
  );
  const isSelectedCounselorFree = selectedCounselorData
    ? getCounselorPricing(selectedCounselorData)
    : false;

  const canProceedToStep2 = selectedDate && selectedCounselor && selectedTime;
  const canSubmit = canProceedToStep2 && formData.reason; // Removed name and email validation since user is logged in

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-serif font-bold mb-4">
            Appointment Confirmed
          </h3>
          <div className="space-y-2 text-muted-foreground mb-6">
            <p>
              <strong>Date:</strong>{" "}
              {selectedDate && format(selectedDate, "MMMM d, yyyy")}
            </p>
            <p>
              <strong>Time:</strong> {selectedTime}
            </p>
            <p>
              <strong>Counselor:</strong>{" "}
              {counselors.find((c) => c.id === selectedCounselor)?.name}
            </p>
            <p>
              <strong>Institution:</strong>{" "}
              {counselors.find((c) => c.id === selectedCounselor)?.institution}
            </p>
            <p>
              <strong>Session Type:</strong>{" "}
              <span
                className={
                  isSelectedCounselorFree ? "text-green-600" : "text-blue-600"
                }
              >
                {isSelectedCounselorFree ? "Free Session" : "Paid Session"}
              </span>
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">
                Confidentiality Notice
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your appointment and all discussions are completely confidential.
              You'll receive a confirmation email with session details and
              preparation tips.
            </p>
          </div>
          <Button onClick={() => window.location.reload()} variant="outline">
            Book Another Appointment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div
          className={`flex items-center gap-2 ${
            step >= 1 ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <span className="text-sm font-medium">Select Date & Counselor</span>
        </div>
        <div className="w-8 h-px bg-border" />
        <div
          className={`flex items-center gap-2 ${
            step >= 2 ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <span className="text-sm font-medium">Session Details</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-6">
          {/* Date Selection and Filter Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <CalendarIcon className="h-5 w-5" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Filter Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <Filter className="h-5 w-5" />
                  Filter Counselors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Select
                    value={institutionFilter}
                    onValueChange={setInstitutionFilter}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by institution" />
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
              </CardContent>
            </Card>
          </div>

          {/* Free Counselors Section */}
          <Card className="border-green-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 bg-green-500 rounded-full shadow-sm"></div>
                  <div>
                    <CardTitle className="text-green-800 font-serif text-lg">
                      Free Counselors from {user.institution}
                    </CardTitle>
                    <p className="text-sm text-green-600 mt-1">
                      These counselors are free for students from your
                      institution and include chat support
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-200 text-green-800 px-3 py-1 text-sm font-medium">
                  {freeCounselors.length} available
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {freeCounselors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {freeCounselors.map((counselor) => (
                    <div
                      key={counselor.id}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[280px] ${
                        selectedCounselor === counselor.id
                          ? "border-green-500 bg-green-50 shadow-lg ring-2 ring-green-200"
                          : "border-green-200 hover:border-green-400 bg-white"
                      }`}
                      onClick={() => setSelectedCounselor(counselor.id)}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src={counselor.image}
                              alt={`${counselor.name} profile`}
                              className="w-16 h-16 rounded-full object-cover border-3 border-green-200 shadow-sm"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-white text-xs font-bold">
                                ✓
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-base text-gray-900 mb-1">
                              {counselor.name}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {counselor.institution}
                            </p>
                            <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              Free Service
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-2">
                              Specialties:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {counselor.specialties
                                .slice(0, 3)
                                .map((specialty) => (
                                  <Badge
                                    key={specialty}
                                    variant="secondary"
                                    className="text-xs bg-green-100 text-green-700 border-green-200"
                                  >
                                    {specialty}
                                  </Badge>
                                ))}
                              {counselor.specialties.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-green-300 text-green-600"
                                >
                                  +{counselor.specialties.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-2">
                              Languages:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {counselor.languages.map((language) => (
                                <Badge
                                  key={language}
                                  variant="outline"
                                  className="text-xs bg-green-50 text-green-600 border-green-300"
                                >
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 pt-2">
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                startChat(counselor.id);
                              }}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-sm h-11 font-medium px-4 py-2 whitespace-nowrap"
                            >
                              💬 Chat Now
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCounselor(counselor.id);
                              }}
                              className="flex-1 border-green-300 text-green-700 hover:bg-green-50 text-sm h-11 font-medium px-4 py-2 whitespace-nowrap"
                            >
                              📅 Book Session
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-green-700 mb-2">
                    No Free Counselors Available
                  </h4>
                  <p className="text-gray-600">
                    No counselors from your institution are currently available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Paid Counselors Section */}
          <Card className="border-blue-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 bg-blue-500 rounded-full shadow-sm"></div>
                  <div>
                    <CardTitle className="text-blue-800 font-serif text-lg">
                      Paid Counselors from Other Institutions
                    </CardTitle>
                    <p className="text-sm text-blue-600 mt-1">
                      These counselors require payment (₹500 per session) as
                      they are from different institutions
                    </p>
                  </div>
                </div>
                <Badge className="bg-blue-200 text-blue-800 px-3 py-1 text-sm font-medium">
                  {paidCounselors.length} available
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {paidCounselors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paidCounselors.map((counselor) => (
                    <div
                      key={counselor.id}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] min-h-[280px] ${
                        selectedCounselor === counselor.id
                          ? "border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200"
                          : "border-blue-200 hover:border-blue-400 bg-white"
                      }`}
                      onClick={() => setSelectedCounselor(counselor.id)}
                    >
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src={counselor.image}
                              alt={`${counselor.name} profile`}
                              className="w-16 h-16 rounded-full object-cover border-3 border-blue-200 shadow-sm"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-white text-xs font-bold">
                                ₹
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-base text-gray-900 mb-1">
                              {counselor.name}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {counselor.institution}
                            </p>
                            <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              Paid Service
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-2">
                              Specialties:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {counselor.specialties
                                .slice(0, 3)
                                .map((specialty) => (
                                  <Badge
                                    key={specialty}
                                    variant="secondary"
                                    className="text-xs bg-blue-100 text-blue-700 border-blue-200"
                                  >
                                    {specialty}
                                  </Badge>
                                ))}
                              {counselor.specialties.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-blue-300 text-blue-600"
                                >
                                  +{counselor.specialties.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-2">
                              Languages:
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {counselor.languages.map((language) => (
                                <Badge
                                  key={language}
                                  variant="outline"
                                  className="text-xs bg-blue-50 text-blue-600 border-blue-300"
                                >
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-200 text-center">
                              <div className="text-xl font-bold text-blue-600">
                                ₹500
                              </div>
                              <div className="text-xs text-blue-600 font-medium">
                                per session
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCounselor(counselor.id);
                              }}
                              className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 text-sm h-11 font-medium px-4 py-2 whitespace-nowrap"
                            >
                              💳 Book Paid Session
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-blue-700 mb-2">
                    No Paid Counselors Available
                  </h4>
                  <p className="text-gray-600">
                    No counselors from other institutions are currently
                    available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* No Counselors Message */}
          {freeCounselors.length === 0 && paidCounselors.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No Counselors Available
                </h3>
                <p className="text-muted-foreground">
                  No counselors match your current filter. Try adjusting your
                  search criteria.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Time Selection */}
          {selectedCounselor && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <Clock className="h-5 w-5" />
                  Available Times
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select a time slot for your appointment with{" "}
                  {counselors.find((c) => c.id === selectedCounselor)?.name}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={
                        selectedTime === slot.time ? "default" : "outline"
                      }
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className="text-sm h-12"
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
                {selectedTime && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">
                      Selected: {selectedTime} on{" "}
                      {selectedDate && format(selectedDate, "MMMM d, yyyy")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Session Details</CardTitle>
            <p className="text-sm text-muted-foreground">
              Booking for: {user.userId} ({user.email}) - {user.institution}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="urgency">
                How urgent is your need for support?
              </Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => handleInputChange("urgency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    Low - General support and guidance
                  </SelectItem>
                  <SelectItem value="medium">
                    Medium - Noticeable impact on daily life
                  </SelectItem>
                  <SelectItem value="high">
                    High - Significant distress, need support soon
                  </SelectItem>
                  <SelectItem value="crisis">
                    Crisis - Immediate help needed
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previous">
                Have you received counseling before?
              </Label>
              <Select
                value={formData.previousCounseling}
                onValueChange={(value) =>
                  handleInputChange("previousCounseling", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No, this is my first time</SelectItem>
                  <SelectItem value="yes-helpful">
                    Yes, and it was helpful
                  </SelectItem>
                  <SelectItem value="yes-mixed">
                    Yes, but it was mixed results
                  </SelectItem>
                  <SelectItem value="yes-unhelpful">
                    Yes, but it wasn't helpful
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">
                What brings you to counseling today? *
              </Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                placeholder="Please share what you'd like to work on or discuss. This helps your counselor prepare for your session."
                rows={4}
              />
            </div>

            {/* Payment Section for Paid Counselors */}
            {!isSelectedCounselorFree && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 text-xl">💳</div>
                  <div>
                    <h4 className="font-medium text-sm mb-1 text-blue-900">
                      Payment Required
                    </h4>
                    <p className="text-sm text-blue-700 mb-3">
                      This counselor is from a different institution. A payment
                      of ₹500 is required to book this session.
                    </p>
                    <div className="bg-white p-3 rounded border">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Session Fee:
                        </span>
                        <span className="text-lg font-bold text-blue-600">
                          ₹500
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-muted-foreground">
                          Payment Method:
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Online Payment
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm mb-1">
                    Privacy & Confidentiality
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your information is protected by HIPAA and university
                    confidentiality policies. Sessions are private and secure,
                    with exceptions only for imminent safety concerns.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Interface */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md bg-background shadow-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm">💬</span>
                  </div>
                  <div>
                    <CardTitle className="text-sm font-medium">
                      {
                        counselors.find(
                          (c) => c.id === selectedCounselorForChat
                        )?.name
                      }
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Free Chat Support
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(false)}
                  className="h-8 w-8 p-0"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="h-64 overflow-y-auto border rounded-lg p-3 space-y-2 bg-muted/20">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-muted-foreground py-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-600">💬</span>
                    </div>
                    <p className="text-sm font-medium">Start a conversation</p>
                    <p className="text-xs">Share what's on your mind</p>
                  </div>
                ) : (
                  chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-2 rounded-lg text-xs ${
                          msg.sender === "user"
                            ? "bg-green-600 text-white"
                            : "bg-white border"
                        }`}
                      >
                        <p className="text-xs">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 text-xs resize-none"
                  rows={1}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!chatMessage.trim()}
                  size="sm"
                  className="px-3"
                >
                  Send
                </Button>
              </div>

              <div className="text-xs text-muted-foreground text-center bg-green-50 p-2 rounded">
                <p>
                  💡 Free chat support • Book appointment for formal sessions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(1)}
          disabled={step === 1}
        >
          Previous
        </Button>
        <div className="flex gap-2">
          {step === 1 && (
            <Button onClick={() => setStep(2)} disabled={!canProceedToStep2}>
              Continue to Session Details
            </Button>
          )}
          {step === 2 && (
            <Button onClick={handleSubmit} disabled={!canSubmit}>
              {isSelectedCounselorFree
                ? "Confirm Free Appointment"
                : "Proceed to Payment"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
