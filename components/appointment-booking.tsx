"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Shield, CheckCircle, Filter } from "lucide-react"
import { format } from "date-fns"

interface Counselor {
  id: string
  name: string
  specialties: string[]
  availability: string[]
  languages: string[]
  institution: string // Added institution field
}

interface TimeSlot {
  time: string
  available: boolean
}

interface AppointmentBookingProps {
  user: {
    name: string
    email: string
    phone: string
    institution: string
  }
}

const counselors: Counselor[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    specialties: ["Anxiety", "Depression", "Academic Stress"],
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Hindi"],
    institution: "University of Delhi", // Added institution
  },
  {
    id: "2",
    name: "Dr. Debdip Bhattacharya",
    specialties: ["Relationship Issues", "Self-Esteem", "Life Transitions"],
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Bengali"],
    institution: "Jawaharlal Nehru University", // Added institution
  },
  {
    id: "3",
    name: "Dr. Priya Patel",
    specialties: ["Cultural Identity", "Family Conflicts", "Stress Management"],
    availability: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    languages: ["English", "Hindi", "Bengali"],
    institution: "University of Delhi", // Added institution
  },
  {
    id: "4",
    name: "Dr. Rajesh Kumar",
    specialties: ["Career Counseling", "Academic Pressure", "Social Anxiety"],
    availability: ["Monday", "Wednesday", "Friday"],
    languages: ["English", "Hindi", "Bengali"],
    institution: "Indian Institute of Technology Delhi", // Added institution
  },
  {
    id: "5",
    name: "Dr. Fatima Sheikh",
    specialties: ["Trauma", "PTSD", "Mindfulness"],
    availability: ["Tuesday", "Thursday", "Saturday"],
    languages: ["English", "Bengali", "Hindi"],
    institution: "Jamia Millia Islamia", // Added institution
  },
]

const timeSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "1:00 PM", available: true },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: false },
  { time: "4:00 PM", available: true },
]

export function AppointmentBooking({ user }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedCounselor, setSelectedCounselor] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [institutionFilter, setInstitutionFilter] = useState<string>("All") // Added institution filter
  const [formData, setFormData] = useState({
    reason: "",
    urgency: "",
    previousCounseling: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState(1)

  const filteredCounselors =
    institutionFilter === "All"
      ? counselors
      : counselors.filter((counselor) => counselor.institution === institutionFilter)

  const institutions = ["All", ...Array.from(new Set(counselors.map((c) => c.institution)))]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    setIsSubmitted(true)
  }

  const canProceedToStep2 = selectedDate && selectedCounselor && selectedTime
  const canSubmit = canProceedToStep2 && formData.reason // Removed name and email validation since user is logged in

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-serif font-bold mb-4">Appointment Confirmed</h3>
          <div className="space-y-2 text-muted-foreground mb-6">
            <p>
              <strong>Date:</strong> {selectedDate && format(selectedDate, "MMMM d, yyyy")}
            </p>
            <p>
              <strong>Time:</strong> {selectedTime}
            </p>
            <p>
              <strong>Counselor:</strong> {counselors.find((c) => c.id === selectedCounselor)?.name}
            </p>
            <p>
              <strong>Institution:</strong> {counselors.find((c) => c.id === selectedCounselor)?.institution}
            </p>
          </div>
          <div className="bg-card p-4 rounded-lg border mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Confidentiality Notice</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your appointment and all discussions are completely confidential. You'll receive a confirmation email with
              session details and preparation tips.
            </p>
          </div>
          <Button onClick={() => window.location.reload()} variant="outline">
            Book Another Appointment
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <span className="text-sm font-medium">Select Date & Counselor</span>
        </div>
        <div className="w-8 h-px bg-border" />
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <span className="text-sm font-medium">Session Details</span>
        </div>
      </div>

      {step === 1 && (
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

          {/* Counselor & Time Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif">
                  <Shield className="h-5 w-5" />
                  Choose Counselor
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <Select value={institutionFilter} onValueChange={setInstitutionFilter}>
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
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredCounselors.map((counselor) => (
                  <div
                    key={counselor.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedCounselor === counselor.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCounselor(counselor.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={`/professional-counsellor-headshot-.jpg?key=vi4d6&height=80&width=80&query=professional counsellor headshot ${counselor.name}`}
                          alt={`${counselor.name} profile`}
                          className="w-20 h-20 rounded-full object-cover border-2 border-border"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium mb-2">{counselor.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{counselor.institution}</p>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Specialties:</p>
                            <div className="flex flex-wrap gap-1">
                              {counselor.specialties.map((specialty) => (
                                <Badge key={specialty} variant="secondary" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Languages:</p>
                            <p className="text-sm">{counselor.languages.join(", ")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {selectedCounselor && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-serif">
                    <Clock className="h-5 w-5" />
                    Available Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                        className="text-sm"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Session Details</CardTitle>
            <p className="text-sm text-muted-foreground">
              Booking for: {user.name} ({user.email}) - {user.institution}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="urgency">How urgent is your need for support?</Label>
              <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - General support and guidance</SelectItem>
                  <SelectItem value="medium">Medium - Noticeable impact on daily life</SelectItem>
                  <SelectItem value="high">High - Significant distress, need support soon</SelectItem>
                  <SelectItem value="crisis">Crisis - Immediate help needed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="previous">Have you received counseling before?</Label>
              <Select
                value={formData.previousCounseling}
                onValueChange={(value) => handleInputChange("previousCounseling", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No, this is my first time</SelectItem>
                  <SelectItem value="yes-helpful">Yes, and it was helpful</SelectItem>
                  <SelectItem value="yes-mixed">Yes, but it was mixed results</SelectItem>
                  <SelectItem value="yes-unhelpful">Yes, but it wasn't helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">What brings you to counseling today? *</Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                placeholder="Please share what you'd like to work on or discuss. This helps your counselor prepare for your session."
                rows={4}
              />
            </div>

            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Privacy & Confidentiality</h4>
                  <p className="text-sm text-muted-foreground">
                    Your information is protected by HIPAA and university confidentiality policies. Sessions are private
                    and secure, with exceptions only for imminent safety concerns.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)} disabled={step === 1}>
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
              Confirm Appointment
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
