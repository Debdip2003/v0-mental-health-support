import { AppointmentBooking } from "@/components/appointment-booking"

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-serif font-bold text-foreground">Book an Appointment</h1>
          <p className="text-muted-foreground mt-2">
            Schedule a confidential session with one of our licensed counselors
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AppointmentBooking />
      </main>
    </div>
  )
}
